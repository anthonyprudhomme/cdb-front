import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanyComponent,
    CompaniesComponent,
    CompanyCreateComponent,
    CompanyUpdateComponent
  ]
})
export class CompanyModule { }
