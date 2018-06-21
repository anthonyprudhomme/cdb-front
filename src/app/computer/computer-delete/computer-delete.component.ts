import { Component, OnInit, Inject } from '@angular/core';
import { Computer } from '../computer.model';
import { ComputerService } from '../computer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-computer-delete',
  templateUrl: './computer-delete.component.html',
  styleUrls: ['./computer-delete.component.scss']
})
export class ComputerDeleteComponent {
  computer: Computer;

  constructor(private companyService: ComputerService,
              private dialog: MatDialogRef<ComputerDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.computer = data;
  }

  delete() {
    this.companyService.deleteComputer(this.computer).subscribe(
      () => {
        this.dialog.componentInstance.data = {wasDeleted: true};
      },
      err => console.log(err)
    );
  }

}
