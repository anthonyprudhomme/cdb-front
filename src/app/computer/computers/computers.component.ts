import { Component, OnInit, ViewChild } from '@angular/core';
import { Computer } from '../computer.model';
import { PageEvent, MatPaginator, MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ComputerService } from '../computer.service';
import { ComputerCreateComponent } from '../computer-create/computer-create.component';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined, isUndefined } from 'util';

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

  constructor(private computerService: ComputerService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar,
     private translate: TranslateService) { }
  searchType: string;
  searchOptions = ['Computer name', 'Company name'];

  sortOptions = [
    {viewValue: '--'},
    {value: 'name_asc', viewValue: 'Name asc'},
    {value: 'name_desc', viewValue: 'Name desc'},

    {value: 'introduced_asc', viewValue: 'Increasing introduced date'},
    {value: 'introduced_desc', viewValue: 'Decreasing introduced date'},
    {value: 'discontinued_asc', viewValue: 'Increasing discontinued date'},
    {value: 'discontinued_desc', viewValue: 'Decreasing discontinued date'},
    {value: 'company_asc', viewValue: 'Company name asc'},
    {value: 'company_desc', viewValue: 'Company name desc'}];

  sortSelected: string;

  ngOnInit() {
    this.pageEvent = new PageEvent();
    this.computerService.getComputersAtPage(1, this.pageSizeOptions[0]).subscribe(computers => {
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
    this.openSnackBar(this.translate.instant('COMPUTER.DELETE_SUCCESS'), 'success-snackbar');
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
        this.openSnackBar(this.translate.instant('COMPUTER.CREATE_SUCCESS'), 'success-snackbar');
      }
    });
  }

  changePage(event?: PageEvent): PageEvent {

    // If there is no search and no sort
    if (isNullOrUndefined(this.searchValue) && isNullOrUndefined(this.sortSelected)) {
      this.computerService.getComputersAtPage(event.pageIndex + 1, event.pageSize).subscribe(computers => {
        this.computers = computers;
      });
      this.computerService.countComputers().subscribe(length => this.pageEvent.length = length);
    }

    // If there is a search and no sort
    if (!isNullOrUndefined(this.searchValue) && isNullOrUndefined(this.sortSelected)) {
      this.computerService.searchComputers(this.searchValue, event.pageIndex + 1, event.pageSize, this.searchType).subscribe(computers => {
        this.computers = computers;
      });
      this.computerService.countSearchedComputers(this.searchValue, this.searchType).subscribe(length => this.pageEvent.length = length);
    }

    // If there is no search and a sort
    if (isNullOrUndefined(this.searchValue) && !isNullOrUndefined(this.sortSelected)) {
      this.computerService.sortComputers(this.sortSelected, event.pageIndex + 1, event.pageSize).subscribe(computers => {
        this.computers = computers;
      });
      this.computerService.countComputers().subscribe(length => this.pageEvent.length = length);
    }

    // If there is a search and a sort
    if (!isNullOrUndefined(this.searchValue) && !isNullOrUndefined(this.sortSelected)) {
      this.computerService.sortSearchedComputers(
        this.searchValue, this.sortSelected, event.pageIndex + 1, event.pageSize, this.searchType).subscribe(computers => {
        this.computers = computers;
      });
      this.computerService.countSearchedComputers(this.searchValue, this.searchType).subscribe(length => this.pageEvent.length = length);
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
    this.pageEvent.pageSize = this.pageSizeOptions[0];

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

  sort() {
    this.resetPaginator();
    this.changePage(this.pageEvent);
  }
}
