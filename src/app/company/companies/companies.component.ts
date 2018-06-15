import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { MatTableModule } from '@angular/material';
import { Page } from '../../page.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  page: Page<Company>;
  searchValue: string;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.companyService.getCompaniesAtPage(1, 10).subscribe(page => {
      this.page = page;
      this.companies = this.page.results;
    }, err => {console.log(err); });
  }

  recipeDeleted(company: Company) {
    const index = this.companies.indexOf(company);
    this.companies.splice(index);
  }

  search() {
    // this.companyService.searchBy(searchValue).subscribe(companies => this.companies = companies, err => {console.log(err); });
  }

  create() {

  }

}
