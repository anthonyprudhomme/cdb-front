import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [CompanyComponent, CompaniesComponent, CompanyCreateComponent, CompanyUpdateComponent]
})
export class CompanyModule { }
