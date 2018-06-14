import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerComponent } from './computer.component';
import { ComputersComponent } from './computers/computers.component';
import { ComputerCreateComponent } from './computer-create/computer-create.component';
import { ComputerUpdateComponent } from './computer-update/computer-update.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [ComputerComponent, ComputersComponent, ComputerCreateComponent, ComputerUpdateComponent]
})
export class ComputerModule { }
