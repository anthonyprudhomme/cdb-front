import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { Computer } from '../computer.model';
import { Company } from '../../company/company.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateErrorStateMatcher } from '../computer-create/dateErrorStateMatcher';
import { ComputerService } from '../computer.service';
import { CompanyService } from '../../company/company.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ComputerCreateComponent } from '../computer-create/computer-create.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-computer-update',
  templateUrl: './computer-update.component.html',
  styleUrls: ['./computer-update.component.scss']
})
export class ComputerUpdateComponent implements OnInit, AfterViewInit {

  @Input()
  introduced: Date;
  @Input()
  discontinued: Date;
  selectedCompany: Company;
  selectedCompany_id: number;

  computer: Computer;
  companies: Company[];

  computerAddForm: FormGroup;
  matcher = new DateErrorStateMatcher();

  constructor(
    private computerService: ComputerService,
    private companyService: CompanyService,
    private dialog: MatDialogRef<ComputerCreateComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Computer
  ) {
    this.computer = data;
  }

  ngOnInit() {
    this.selectedCompany = new Company();
    this.selectedCompany.name = this.computer.manufacturer;
    this.selectedCompany.id = this.computer.manufacturer_id;
    this.selectedCompany_id = this.computer.manufacturer_id;

    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    }, err => {console.log(err); });

    this.computerAddForm = this.formBuilder.group({
      name : new FormControl(this.computer.name, Validators.required),
      introduced : new FormControl(this.computer.introduced),
      discontinued : new FormControl(this.computer.discontinued),
      company : new FormControl(this.selectedCompany_id)
    },
    {
      validator: Validators.compose([
        this.checkIntroducedBeforeDiscontinued
      ])
    }
  );

  }

  ngAfterViewInit() {

    document.getElementById('introduced').valueAsDate = new Date(this.computer.introduced);
    document.getElementById('discontinued').valueAsDate = new Date(this.computer.discontinued);
  }

  submit() {
    if (this.computerAddForm.valid) {
      this.computer.name = this.computerAddForm.value.name;
      this.computer.introduced = this.computerAddForm.value.introduced;
      this.computer.discontinued = this.computerAddForm.value.discontinued;
      this.computer.manufacturer_id = this.selectedCompany_id;
      this.computer.manufacturer = this.companies.find( (c) => c.id === this.selectedCompany_id ).name;
      this.computerService.updateComputer(this.computer).subscribe();

      this.dialog.close({'send': 'OK'});
    }
  }


  checkIntroducedBeforeDiscontinued(group: FormGroup) {
    const introduced = group.controls.introduced.value;
    const discontinued = group.controls.discontinued.value;

    const isBlank = (s) => (isNullOrUndefined(s) || s === '');

    if (isBlank(introduced) || isBlank(discontinued)) {
      return null;
    }

    if (discontinued < introduced) {
      return { introducedAfterDiscontinued: true };
    }
    return null;
  }

  updateDate() {
    this.introduced = this.computerAddForm.value.introduced;
    const elem = document.getElementById('discontinued') as HTMLInputElement;
    elem.min = this.introduced.toString();
  }

}
