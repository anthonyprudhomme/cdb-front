<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
=======
import {Component, OnInit, ViewChild, Input} from '@angular/core';
>>>>>>> 00e817126f326ec7c020d062b2e93fb0852b163f
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { MatPaginator, PageEvent, MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined, isUndefined } from 'util';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  animations: [

    trigger('staggerAnim', [
      transition('void => *', [
        query('mat-card, td',
          style({ opacity: 0, transform: 'translateX(0px)' })
        ),

        query('mat-card, td', stagger('100ms', [
          animate('100ms 0.2s ease-out', style({ opacity: 1, transform: 'translateX(0px)' })),
          animate('100ms 0.2s ease-out', style({ opacity: 1, transform: 'translateX(-10px)' })),
          animate('100ms 0.2s ease-out', style({ opacity: 1, transform: 'translateX(0px)' })),
        ])),

        query('mat-card, td', [
          animate(100, style('*'))
        ])
      ])
    ])
  ]
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  searchValue: string;

  pageEvent: PageEvent;
  pageSizeOptions = [10, 25, 100];

  sortOptions = [
    {viewValue: '--'},
    {value: 'name_asc', viewValue: 'Name asc'},
    {value: 'name_desc', viewValue: 'Name desc'},
    {value: 'number_of_computers_asc', viewValue: 'Increasing number of computers'},
    {value: 'number_of_computers_desc', viewValue: 'Decreasing number of computers'}];

  sortSelected: string;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService) {
    }

  ngOnInit() {
    this.pageEvent = new PageEvent();
    this.companyService.getCompaniesAtPage(1, this.pageSizeOptions[0]).subscribe(companies => {
      this.companies = companies;
      this.resetPaginator();
    }, err => {console.log(err); console.log('ICI'); });
    this.companyService.countCompanies().subscribe(length => this.pageEvent.length = length);
    window.onscroll = () => this.onScroll();
  }

  onScroll() {
    const scrolledFromTop = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    const isOnLargePage = this.paginator.pageSize > this.pageSizeOptions[0];
    const scroll = document.getElementById('scrollButton');
    if (scroll != null) {
      if (scrolledFromTop && isOnLargePage) {
        scroll.style.display = 'block';
      } else {
        scroll.style.display = 'none';
      }
    }
  }

  companyDeleted() {
    if (this.pageEvent.pageIndex === (this.pageEvent.length - 1) / this.pageEvent.pageSize
     && (this.pageEvent.length - 1) % this.pageEvent.pageSize === 0
     && this.pageEvent.pageIndex > 0) {
      this.pageEvent.pageIndex--;
      this.paginator._pageIndex--;
    }
    this.changePage(this.pageEvent);
    this.openSnackBar(this.translate.instant('COMPANY.DELETE_SUCCESS'), 'success-snackbar');
  }

  search() {
    this.resetPaginator();
    this.changePage(this.pageEvent);
  }

  create() {
    const dialogRef = this.dialog.open(CompanyCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.changePage(this.pageEvent);
        this.openSnackBar(this.translate.instant('COMPANY.CREATE_SUCCESS'), 'success-snackbar');
      }
    });
  }

  changePage(event?: PageEvent): PageEvent {

    // If there is no search and no sort
    if (isNullOrUndefined(this.searchValue) && isNullOrUndefined(this.sortSelected)) {
      this.companyService.getCompaniesAtPage(event.pageIndex + 1, event.pageSize).subscribe(companies => {
        this.companies = companies;
      });
      this.companyService.countCompanies().subscribe(length => this.pageEvent.length = length);
    }

    // If there is a search and no sort
    if (!isNullOrUndefined(this.searchValue) && isNullOrUndefined(this.sortSelected)) {
      this.companyService.searchCompanies(this.searchValue, event.pageIndex + 1, event.pageSize).subscribe(companies => {
        this.companies = companies;
      });
      this.companyService.countSearchedCompanies(this.searchValue).subscribe(length => this.pageEvent.length = length);
    }

    // If there is no search and a sort
    if (isNullOrUndefined(this.searchValue) && !isNullOrUndefined(this.sortSelected)) {
      this.companyService.sortCompanies(this.sortSelected, event.pageIndex + 1, event.pageSize).subscribe(companies => {
        this.companies = companies;
      });
      this.companyService.countCompanies().subscribe(length => this.pageEvent.length = length);
    }

    // If there is a search and a sort
    if (!isNullOrUndefined(this.searchValue) && !isNullOrUndefined(this.sortSelected)) {
      this.companyService.sortSearchedCompanies(
        this.searchValue, this.sortSelected, event.pageIndex + 1, event.pageSize).subscribe(companies => {
        this.companies = companies;
      });
      this.companyService.countSearchedCompanies(this.searchValue).subscribe(length => this.pageEvent.length = length);
    }

    this.scrollToTop();
    return event;
  }

  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  clearSearch() {
    this.searchValue = null;
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

  sort() {
    this.resetPaginator();
    this.changePage(this.pageEvent);
  }
}
