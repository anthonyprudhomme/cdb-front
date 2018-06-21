import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyDeleteComponent } from './company-delete/company-delete.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    CompanyComponent,
    CompaniesComponent,
    CompanyCreateComponent,
    CompanyUpdateComponent,
    CompanyDeleteComponent
  ],
  entryComponents: [CompanyDeleteComponent]
})
export class CompanyModule { }
