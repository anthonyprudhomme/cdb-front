import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computer } from './computer.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ComputerDeleteComponent } from './computer-delete/computer-delete.component';
import { ComputerUpdateComponent } from './computer-update/computer-update.component';

@Component({
  selector: 'app-computer, [app-computer]',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent {

  @Input('computer') computer: Computer;
  @Input('isAdmin') isAdmin: boolean;
  @Output() delete: EventEmitter<Computer> = new EventEmitter();
  deleteDialogRef: MatDialogRef<ComputerDeleteComponent, any>;

  constructor(private dialog: MatDialog) { }

  deleteComputer() {
    if (this.isAdmin) {
      this.deleteDialogRef = this.dialog.open(ComputerDeleteComponent, {data: this.computer});
      this.deleteDialogRef.afterClosed().subscribe((success) => {
        if (success) {
          this.delete.emit();
        }
      });
    }
  }

  updateComputer() {
    this.dialog.open(ComputerUpdateComponent, {data: this.computer});
  }

}
