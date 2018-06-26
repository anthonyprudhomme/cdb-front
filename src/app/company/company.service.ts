import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './company.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://10.0.1.81:8080/webservice/company';

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
    const options = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Company>(this._baseUrl, JSON.stringify(company), {headers: options, withCredentials: true });
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(this._baseUrl + '/' + company.id, company, {withCredentials: true});
  }

  deleteCompany(company: Company): Observable<Company> {
    return this.http.delete<Company>(`${ this._baseUrl }/${ company.id }`, {withCredentials: true});
  }

  countCompanies(): Observable<number> {
    return this.http.get<number>(this._baseUrl + '/count');
  }

  searchCompanies(search: string, page: number, results: number): Observable<Company[]> {
    let params = new HttpParams();
    params = params.append('search', search);
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    return this.http.get<Company[]>(this._baseUrl + '/search', {params: params, withCredentials: true});
  }

  countSearchedCompanies(search: string): Observable<number> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get<number>(this._baseUrl + '/count', {params: params});
  }

  sortCompanies(sort: string, page: number, results: number): Observable<Company[]> {
    let params = this.constructParams(sort);
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    return this.http.get<Company[]>(this._baseUrl + '/sort', {params: params, withCredentials: true});
  }

  sortSearchedCompanies(search: string, sort: string, page: number, results: number): Observable<Company[]> {
    let params = this.constructParams(sort);
    params = params.append('search', search);
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    return this.http.get<Company[]>(this._baseUrl + '/sort', {params: params});
  }

  constructParams(sort: string): HttpParams {
    let params = new HttpParams();
    if (sort === 'name_asc') {
      params = params.append('sort', 'name');
      params = params.append('asc', 'true');
    }
    if (sort === 'name_desc') {
      params = params.append('sort', 'name');
      params = params.append('asc', 'false');
    }
    if (sort === 'number_of_computers_asc') {
      params = params.append('sort', 'number_of_computers');
      params = params.append('asc', 'true');
    }
    if (sort === 'number_of_computers_desc') {
      params = params.append('sort', 'number_of_computers');
      params = params.append('asc', 'false');
    }
    return params;
  }
}
