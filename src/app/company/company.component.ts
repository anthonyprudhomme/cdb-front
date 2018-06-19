import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from './company.model';
import { CompanyService } from './company.service';
import {MatDialog} from '@angular/material';
import {CompanyUpdateComponent} from './company-update/company-update.component';

@Component({
  selector: 'app-company, [app-company]',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input() company: Company;
  @Output() delete: EventEmitter<Company> = new EventEmitter();

  constructor(private companyService: CompanyService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  deleteCompany(company) {
    const result = this.companyService.deleteCompany(company);
    result.subscribe(
      output => {
        this.delete.emit(this.company);
        console.log(output); },
      err => console.log(err)
    );
  }

  updateCompany() {
    this.dialog.open(CompanyUpdateComponent, {data: this.company});
  }

}
