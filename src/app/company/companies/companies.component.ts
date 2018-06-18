import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import {PageEvent} from '@angular/material';

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

 constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.pageEvent = new PageEvent();

    this.companyService.getCompaniesAtPage(1, 10).subscribe(companies => {
      this.companies = companies;
      this.pageEvent.pageIndex = 0;
      this.pageEvent.pageSize = 10;
    }, err => {console.log(err); });

    this.companyService.countCompanies().subscribe(length => this.pageEvent.length = length);
  }

  recipeDeleted(company: Company) {
    const index = this.companies.indexOf(company);
    this.companies.splice(index, 1);
  }

  search() {
    // this.companyService.searchBy(searchValue).subscribe(companies => this.companies = companies, err => {console.log(err); });
  }

  create() {

  }

  changePage(event?: PageEvent): PageEvent {
   this.companyService.getCompaniesAtPage(event.pageIndex + 1, event.pageSize).subscribe(companies => {
     this.companies = companies;
   });
   return event;
  }

}
