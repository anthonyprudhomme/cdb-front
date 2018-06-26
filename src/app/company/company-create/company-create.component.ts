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
      name : new FormControl('', [Validators.required]),
      imageUrl: new FormControl('',
        [Validators.pattern('(https|http).\/\/(.)*'), Validators.required, Validators.maxLength(255)])
    });
  }

  submit() {
    if (this.companyAddForm.valid) {
      const company = new Company();
      company.name = this.companyAddForm.value.name;
      company.imageUrl = this.companyAddForm.value.imageUrl;
      this.service.postCompany(company).subscribe();
      this.dialog.close({'send': 'OK'});
    }
  }

}
