import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { CompanyUpdateComponent } from './company/company-update/company-update.component';
import { ComputerCreateComponent } from './computer/computer-create/computer-create.component';
import { ComputerUpdateComponent } from './computer/computer-update/computer-update.component';
import { LoginComponent } from './login/login.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { ComputersComponent } from './computer/computers/computers.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'company',
    component: CompaniesComponent
  },
  {
    path: 'company/add',
    component: CompanyCreateComponent
  },
  {
    path: 'company/update/:id',
    component: CompanyUpdateComponent
  },
  {
    path: 'computer',
    component: ComputersComponent
  },
  {
    path: 'computer/add',
    component: ComputerCreateComponent
  },
  {
    path: 'computer/update/:id',
    component: ComputerUpdateComponent
  },
  {
    path: '**',
    redirectTo: 'company'
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
