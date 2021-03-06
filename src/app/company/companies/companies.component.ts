import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { MatPaginator, PageEvent, MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined, isUndefined } from 'util';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  animations: [

    trigger('staggerAnim', [
      transition('void => *', [
        query('mat-card, tr',
          style({ opacity: 0, transform: 'translateX(0px)' })
        ),

        query('mat-card, tr', stagger('200ms', [
          animate('200ms 0.4s ease-out', style({ opacity: 1, transform: 'translateX(0px)' })),
          animate('200ms 0.4s ease-out', style({ opacity: 1, transform: 'translateX(-10px)' })),
          animate('200ms 0.4s ease-out', style({ opacity: 1, transform: 'translateX(0px)' })),
        ])),

        query('mat-card, tr', [
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
  pageSizeOptions = [10, 25, 50];

  isAdmin = false;
  sortOptions;
  sortSelected: string;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private companyService: CompanyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.setSortOptions();
    this.pageEvent = new PageEvent();
    this.companyService.getCompaniesAtPage(1, this.pageSizeOptions[0]).subscribe(companies => {
      this.companies = companies;
      this.resetPaginator();
    }, err => {console.log(err); });
    this.companyService.countCompanies().subscribe(length => this.pageEvent.length = length);
    window.onscroll = () => this.onScroll();
    this.loginService.getRolesOfUser().toPromise().then(res => {
      if (res.includes('ADMIN')) {
        this.isAdmin = true;
      }
    });
    this.translate.onLangChange.subscribe(() => {
      this.setSortOptions();
    });
  }

  setSortOptions() {
    const upClass = 'fa-angle-up';
    const downClass = 'fa-angle-down';
    this.sortOptions = [
      {viewValue: '--'},
      {value: 'name_asc', viewValue: this.translate.instant('SELECT.NAME'), iconValue: upClass},
      {value: 'name_desc', viewValue: this.translate.instant('SELECT.NAME'), iconValue: downClass},
      {value: 'number_of_computers_asc', viewValue: this.translate.instant('SELECT.COMPUTER'), iconValue: upClass},
      {value: 'number_of_computers_desc', viewValue: this.translate.instant('SELECT.COMPUTER'), iconValue: downClass}];
  }

  onScroll() {
    const scrolledFromTop = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    let isOnLargePage: boolean;
    if (isNullOrUndefined(this.paginator)) {
      isOnLargePage = false;
    } else {
      isOnLargePage = this.paginator.pageSize > this.pageSizeOptions[0];
    }
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
      this.companyService.countSearchedCompanies(this.searchValue).subscribe(length => {
        this.pageEvent.length = length;
        if (length === 0 ) {
          this.openSnackBar(this.translate.instant('GENERAL.NO_RESULT'), 'warn-snackbar');
        }
      });
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
      this.companyService.countSearchedCompanies(this.searchValue).subscribe(length => {
        this.pageEvent.length = length;
        if (length === 0 ) {
          this.openSnackBar(this.translate.instant('GENERAL.NO_RESULT'), 'success-snackbar');
        }
      });
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

  triggerSearch(event) {
    if (event.keyCode === 13) {
      this.search();
    }
  }
}
