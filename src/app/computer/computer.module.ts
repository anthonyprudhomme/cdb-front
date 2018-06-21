import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerComponent } from './computer.component';
import { ComputersComponent } from './computers/computers.component';
import { ComputerCreateComponent } from './computer-create/computer-create.component';
import { ComputerUpdateComponent } from './computer-update/computer-update.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import { ComputerDeleteComponent } from './computer-delete/computer-delete.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComputerComponent,
    ComputersComponent,
    ComputerCreateComponent,
    ComputerUpdateComponent,
    ComputerDeleteComponent
  ],
  entryComponents : [
    ComputerDeleteComponent
  ]
})
export class ComputerModule { }
