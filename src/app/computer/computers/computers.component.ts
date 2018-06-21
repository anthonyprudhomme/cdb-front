import { Component, OnInit, ViewChild } from '@angular/core';
import { Computer } from '../computer.model';
import { PageEvent, MatPaginator, MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ComputerService } from '../computer.service';
import { ComputerCreateComponent } from '../computer-create/computer-create.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {

  computers: Computer[];
  searchValue: string;
  pageEvent: PageEvent;
  pageSizeOptions = [10, 25, 100];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private computerService: ComputerService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.pageEvent = new PageEvent();
    this.computerService.getComputersAtPage(12, 1).subscribe(computers => {
      this.computers = computers;
    }, err => {console.log(err); });
    this.computerService.countComputers().subscribe(length => this.pageEvent.length = length);
   // window.onscroll = () => this.onScroll();
  }

  // onScroll() {
  //   const scrolledFromTop = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
  //   const isOnLargePage = this.paginator.pageSize > this.pageSizeOptions[0];

  //   if (scrolledFromTop && isOnLargePage) {
  //       document.getElementById('scrollButton').style.display = 'block';
  //   } else {
  //       document.getElementById('scrollButton').style.display = 'none';
  //   }
  // }

  computerDeleted() {
    if (this.pageEvent.pageIndex === (this.pageEvent.length - 1) / this.pageEvent.pageSize
     && (this.pageEvent.length - 1) % this.pageEvent.pageSize === 0
     && this.pageEvent.pageIndex > 0) {
      this.pageEvent.pageIndex--;
      this.paginator._pageIndex--;
    }
    this.changePage(this.pageEvent);
    this.openSnackBar('Computer successfully deleted', 'success-snackbar');
  }

  search() {
    this.resetPaginator();
    this.changePage(this.pageEvent);
  }

  create() {
    const dialogRef = this.dialog.open(ComputerCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.changePage(this.pageEvent);
        this.openSnackBar('Company successfully created', 'success-snackbar');
      }
    });
  }

  changePage(event?: PageEvent): PageEvent {
    if (!this.searchValue || 0 === this.searchValue.length) {
      this.computerService.getComputersAtPage(event.pageIndex + 1, event.pageSize).subscribe(computers => {
        this.computers = computers;
      });
      this.computerService.countComputers().subscribe(length => this.pageEvent.length = length);
    } else {
      this.computerService.searchComputers(this.searchValue, event.pageIndex + 1, event.pageSize).subscribe(computers => {
        this.computers = computers;
      });
      this.computerService.countSearchedComputers(this.searchValue).subscribe(length => this.pageEvent.length = length);
    }
    this.scrollToTop();
    return event;
  }

  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  clearSearch() {
    this.searchValue = '';
    this.resetPaginator();
    this.changePage(this.pageEvent);
  }

  resetPaginator() {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 10;

    // To bypass pageEvent.pageindex api bug
    if (null != this.paginator) {
      this.paginator._pageIndex = 0;
    }
  }

  openSnackBar(message: string, className: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = [className];
    config.horizontalPosition = 'end';
    this.snackBar.open(message, 'OK', config);
  }
}
