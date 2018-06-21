import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from './company.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://localhost:8080/webservice/company';

  constructor(private http: HttpClient) {}

  getCompaniesAtPage(page: number, results: number): Observable<Company[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    const options = {
     withCredentials: true, params: params
    };
    return this.http.get<Company[]>(this._baseUrl, options);
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this._baseUrl);
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${ this._baseUrl }/${ id }`);
  }

  postCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this._baseUrl, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(this._baseUrl + '/' + company.id, company);
  }

  deleteCompany(company: Company): Observable<Company> {
    return this.http.delete<Company>(`${ this._baseUrl }/${ company.id }`);
  }

  countCompanies(): Observable<number> {
    return this.http.get<number>(this._baseUrl + '/count');
  }

  searchCompanies(search: string, page: number, results: number): Observable<Company[]> {
    let params = new HttpParams();
    params = params.append('search', search);
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    return this.http.get<Company[]>(this._baseUrl, {params: params});
  }

  countSearchedCompanies(search: string): Observable<number> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get<number>(this._baseUrl + '/count', {params: params});
  }
}
