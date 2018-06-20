import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CompanyCreateComponent } from '../company-create/company-create.component';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss']
})
export class CompanyUpdateComponent implements OnInit {

  companyAddForm: FormGroup;

  company: Company;

  constructor(private companyService: CompanyService,
              private dialog: MatDialogRef<CompanyCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Company,
              private snackBar: MatSnackBar) {
    this.company = data;
  }

  ngOnInit() {
    this.companyAddForm = new FormGroup({
      name : new FormControl(this.company.name, [Validators.required]),
      picture: new FormControl('',
        [Validators.pattern('(https|http).\/\/(.)*'), Validators.required]),
      description: new FormControl()
    });
  }

  submit() {
    if (this.companyAddForm.valid) {
      this.company.name = this.companyAddForm.value.name;
      this.companyService.updateCompany(this.company).subscribe();
      this.dialog.close({'send': 'OK'});
      this.openSnackBar('Company successfully updated', 'success-snackbar');
    }
  }

  openSnackBar(message: string, className: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = [className];
    config.horizontalPosition = 'end';
    this.snackBar.open(message, 'OK', config);
  }

}
