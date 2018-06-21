import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComputerComponent } from './computer.component';
import { ComputersComponent } from './computers/computers.component';
import { ComputerCreateComponent } from './computer-create/computer-create.component';
import { ComputerUpdateComponent } from './computer-update/computer-update.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    TranslateModule
  ],
  declarations: [
    ComputerComponent,
    ComputersComponent,
    ComputerCreateComponent,
    ComputerUpdateComponent
  ]
})
export class ComputerModule { }
