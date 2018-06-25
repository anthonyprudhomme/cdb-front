import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { TranslateService } from '@ngx-translate/core';

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
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    this.company = data;
  }

  ngOnInit() {
    this.companyAddForm = new FormGroup({
      name : new FormControl(this.company.name, [Validators.required]),
      imageUrl: new FormControl(this.company.imageUrl,
        [Validators.pattern('(https|http).\/\/(.)*'), Validators.required, Validators.maxLength(255)]),
      description: new FormControl()
    });
  }

  submit() {
    if (this.companyAddForm.valid) {
      this.company.name = this.companyAddForm.value.name;
      this.company.imageUrl = this.companyAddForm.value.imageUrl;
      this.companyService.updateCompany(this.company).subscribe();
      this.dialog.close({'send': 'OK'});
      this.openSnackBar(this.translate.instant('COMPANY.UPDATE_SUCCESS'), 'success-snackbar');
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
