import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Computer } from '../computer.model';
import { ComputerService } from '../computer.service';
import { Router } from '@angular/router';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/company.model';

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit {

  computerAddForm: FormGroup;
  computer: Computer;
  selected: number;
  companies: Company[];

  constructor(
    private computerService: ComputerService,
    private companyService: CompanyService,
    private dialog: MatDialogRef<ComputerCreateComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    this.computer = new Computer();
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    }, err => {console.log(err); });

    this.computerAddForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      introduced : new FormControl(),
      description: new FormControl()
    });
  }

  submit() {
    if (this.computerAddForm.valid) {
      const computer = new Computer();
      computer.name = this.computerAddForm.value.name;
      computer.introduced = this.computerAddForm.value.introduced;
      computer.discontinued = this.computerAddForm.value.discontinued;
      computer.manufacturer = this.computerAddForm.value.manufacturer;
      this.computerService.postComputer(computer).subscribe();
      this.dialog.close({'send': 'OK'});
    }
  }

}
