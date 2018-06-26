import { Component, OnInit, Input, Directive } from '@angular/core';
import { MatDialogRef, ErrorStateMatcher, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl,
Validator, NG_VALIDATORS, ValidationErrors, FormGroupDirective, NgForm } from '@angular/forms';
import { Computer } from '../computer.model';
import { ComputerService } from '../computer.service';
import { Router } from '@angular/router';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/company.model';
import { isUndefined, isNullOrUndefined } from 'util';
import { DateErrorStateMatcher } from './dateErrorStateMatcher';

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit {

  @Input()
  introduced: Date;
  @Input()
  discontinued: Date;
  manufacturer_id: number;

  computer: Computer;
  companies: Company[];

  computerAddForm: FormGroup;
  matcher = new DateErrorStateMatcher();

  constructor(
    private computerService: ComputerService,
    private companyService: CompanyService,
    private dialog: MatDialogRef<ComputerCreateComponent>,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.computer = new Computer();
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    }, err => {console.log(err); });

    this.computerAddForm = this.formBuilder.group({
        name : ['', Validators.required],
        introduced : [''],
        discontinued : [''],
        manufacturer_id : ['']
      },
      {
        validator: Validators.compose([
          this.checkIntroducedBeforeDiscontinued
        ])
      }
    );
  }

  submit() {
    if (this.computerAddForm.valid) {
      const computer = new Computer();
      computer.name = this.computerAddForm.value.name;
      computer.introduced = this.computerAddForm.value.introduced;
      computer.discontinued = this.computerAddForm.value.discontinued;
      computer.manufacturer_id = this.computerAddForm.value.manufacturer_id;
      this.computerService.postComputer(computer).subscribe();
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
    console.log('introduced : ' + this.introduced);
    const elem = document.getElementById('discontinued') as HTMLInputElement;
    elem.min = this.introduced.toString();
  }

}
