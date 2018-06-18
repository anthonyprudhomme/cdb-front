import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  companyAddForm: FormGroup;

  company: Company;

  constructor(private service: CompanyService, private dialog: MatDialogRef<CompanyCreateComponent>, private router: Router) { }

  ngOnInit() {
    this.company = new Company();
    this.companyAddForm = new FormGroup({
      name : new FormControl(this.company.name, [Validators.required]),
      picture: new FormControl('',
        [Validators.pattern('(https|http).\/\/(.)*'), Validators.required]),
      description: new FormControl()
    });
  }

  onNoClick() {
    this.dialog.close();
  }

  submit() {
    if (this.companyAddForm.valid) {
     // this.company = this.companyAddForm.value; /!\ Quand la picture sera la
      const company = new Company();
      company.name = this.companyAddForm.value.name;
      this.service.postCompany(company).subscribe();
      this.dialog.close({'send': 'OK'});
    }
  }

}
