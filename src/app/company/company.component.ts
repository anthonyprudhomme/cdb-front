import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Company } from './company.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { CompanyDeleteComponent } from './company-delete/company-delete.component';

@Component({
  selector: 'app-company, [app-company]',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent {

  @Input('company') company: Company;
  @Input('isAdmin') isAdmin: boolean;
  @Output() delete: EventEmitter<Company> = new EventEmitter();
  deleteDialogRef: MatDialogRef<CompanyDeleteComponent, any>;

  constructor(private dialog: MatDialog) {
  }

  deleteCompany() {
    if (this.isAdmin) {
      this.deleteDialogRef = this.dialog.open(CompanyDeleteComponent, {data: this.company});
      this.deleteDialogRef.afterClosed().subscribe((success) => {
        if (success) {
          this.delete.emit();
        }
      });
    }
  }

  updateCompany() {
    this.dialog.open(CompanyUpdateComponent, {data: this.company});
  }

  showImage(image) {
    const img: HTMLElement = document.getElementsByClassName(image)[0] as HTMLElement;
    img.style.opacity = '1';
    img.style.zIndex = '1';
  }

  hideImage(image) {
    const img: HTMLElement = document.getElementsByClassName(image)[0] as HTMLElement;
    img.style.opacity = '0';
    img.style.zIndex = '-1';
  }

  setDefaultImage() {
    this.company.imageUrl = 'assets/images/No_image_available.svg';
  }

}
