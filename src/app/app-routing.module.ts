import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { CompanyUpdateComponent } from './company/company-update/company-update.component';
import { ComputerComponent } from './computer/computer.component';
import { ComputerCreateComponent } from './computer/computer-create/computer-create.component';
import { ComputerUpdateComponent } from './computer/computer-update/computer-update.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent
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
    component: ComputerComponent
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
