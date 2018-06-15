import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
