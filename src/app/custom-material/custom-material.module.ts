import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatDialogModule, MatDatepickerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule, MatListModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import {
  MatBadgeModule,
  MatButtonModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatDividerModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';



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
    MatFormFieldModule,
    MatDialogModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
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
    MatFormFieldModule,
    MatDialogModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
