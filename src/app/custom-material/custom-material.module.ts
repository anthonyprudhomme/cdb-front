import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
