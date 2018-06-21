import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Computer } from './computer.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ComputerDeleteComponent } from './computer-delete/computer-delete.component';

@Component({
  selector: 'app-computer, [app-computer]',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent {

  @Input() computer: Computer;
  @Output() delete: EventEmitter<Computer> = new EventEmitter();
  deleteDialogRef: MatDialogRef<ComputerDeleteComponent, any>;

  constructor(private dialog: MatDialog) { }

  deleteComputer() {
    this.deleteDialogRef = this.dialog.open(ComputerDeleteComponent, {data: this.computer});
    this.deleteDialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.delete.emit();
      }
    });
  }

  updateComputer() {
    this.dialog.open(ComputerDeleteComponent, {data: this.computer});
  }

}
