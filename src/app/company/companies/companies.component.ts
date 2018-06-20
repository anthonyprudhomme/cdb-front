import {Component, OnInit, ViewChild} from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { MatPaginator, PageEvent, MatDialog} from '@angular/material';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { isUndefined } from 'util';

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
          animate('200ms 0.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          animate('200ms 0.2s ease-out', style({ opacity: 1, transform: 'translateX(-10px)' })),
          animate('200ms 0.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
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

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private companyService: CompanyService, private dialog: MatDialog) {}

  ngOnInit() {
    this.pageEvent = new PageEvent();
    this.companyService.getCompaniesAtPage(1, 10).subscribe(companies => {
      this.companies = companies;
      this.resetPaginator();
    }, err => {console.log(err); });
    this.companyService.countCompanies().subscribe(length => this.pageEvent.length = length);
  }

  companyDeleted() {
    if (this.pageEvent.pageIndex === (this.pageEvent.length - 1) / this.pageEvent.pageSize
     && (this.pageEvent.length - 1) % this.pageEvent.pageSize === 0
     && this.pageEvent.pageIndex > 0) {
      this.pageEvent.pageIndex--;
      this.paginator._pageIndex--;
    }
    this.changePage(this.pageEvent);
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
      }
    });
  }

  changePage(event?: PageEvent): PageEvent {
    if (!this.searchValue || 0 === this.searchValue.length) {
      this.companyService.getCompaniesAtPage(event.pageIndex + 1, event.pageSize).subscribe(companies => {
        this.companies = companies;
      });
      this.companyService.countCompanies().subscribe(length => this.pageEvent.length = length);
    } else {
      this.companyService.searchCompanies(this.searchValue, event.pageIndex + 1, event.pageSize).subscribe(companies => {
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

}
