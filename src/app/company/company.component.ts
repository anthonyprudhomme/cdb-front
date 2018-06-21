import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from './company.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { CompanyDeleteComponent } from './company-delete/company-delete.component';

@Component({
  selector: 'app-company, [app-company]',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input() company: Company;
  @Output() delete: EventEmitter<Company> = new EventEmitter();
  deleteDialogRef: MatDialogRef<CompanyDeleteComponent, any>;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  deleteCompany() {
    this.deleteDialogRef = this.dialog.open(CompanyDeleteComponent, {data: this.company});
    this.deleteDialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.delete.emit();
      }
    });
  }

  updateCompany() {
    this.dialog.open(CompanyUpdateComponent, {data: this.company});
  }

  showImage() {

  }

}
