import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    MatTableModule,
    FormsModule,
    MatIconModule
  ],
  declarations: [
    CompanyComponent,
    CompaniesComponent,
    CompanyCreateComponent,
    CompanyUpdateComponent
  ]
})
export class CompanyModule { }
