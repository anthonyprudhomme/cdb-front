import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonModule, MatPaginatorModule, MatToolbarModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  exports: [
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
