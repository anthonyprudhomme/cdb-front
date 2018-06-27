import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.scss']
})
export class CompanyDeleteComponent {
  company: Company;

  constructor(private companyService: CompanyService,
              private dialog: MatDialogRef<CompanyDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.company = data;
  }

  delete() {
    this.companyService.deleteCompany(this.company).subscribe(
      () => {
        this.dialog.componentInstance.data = {wasDeleted: true};
      },
      err => console.log(err)
    );
  }

}
