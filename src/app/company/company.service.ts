import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from './company.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../page.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://localhost:8080/webservice/company';
  id: number;
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this._baseUrl);
  }

  getCompaniesAtPage(page: number, results: number): Observable<Page<Company>> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    return this.http.get<Page<Company>>(this._baseUrl, {params: params});
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${ this._baseUrl }/${ id }`);
  }

  postCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this._baseUrl, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this._baseUrl, company);
  }

  deleteCompany(company: Company): Observable<Company> {
    return this.http.delete<Company>(`${ this._baseUrl }/${ company.id }`);
  }
}
