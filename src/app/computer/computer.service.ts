import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Computer } from './computer.model';
import { Observable, of } from 'rxjs';
import {Company} from '../company/company.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private _baseUrl = 'http://localhost:8080/webservice/computer';

  constructor(private http: HttpClient) { }

  getComputersAtPage(page: number, results: number): Observable<Computer[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    const options = {
      withCredentials: true,
      params: params
    };
    return this.http.get<Computer[]>(this._baseUrl, options);
  }

  getComputer(id: string): Observable<Computer> {
    return this.http.get<Computer>(`${ this._baseUrl }/${ id }`);
  }

  postComputer(computer: Computer): Observable<Computer> {
    return this.http.post<Computer>(this._baseUrl, computer);
  }

  updateComputer(computer: Computer): Observable<Computer> {
    return this.http.put<Computer>(this._baseUrl + '/' + computer.id, computer);
  }

  deleteComputer(company: Computer): Observable<Computer> {
    return this.http.delete<Computer>(`${ this._baseUrl }/${ company.id }`);
  }

  countComputers(): Observable<number> {
    return this.http.get<number>(this._baseUrl + '/count');
  }

  searchComputers(search: string, page: number, results: number, searchType: string): Observable<Computer[]> {
    let params = new HttpParams();
    params = params.append('search', search);
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    params = this.setupSearchType(searchType, params);
    return this.http.get<Computer[]>(this._baseUrl, {params: params});
  }

  countSearchedComputers(search: string, searchType: string): Observable<number> {
    let params = new HttpParams();
    params = params.append('search', search);
    params = this.setupSearchType(searchType, params);
    return this.http.get<number>(this._baseUrl + '/count', {params: params});
  }

  setupSearchType(searchType: string, params: HttpParams): HttpParams {
    if (searchType === 'Computer name') {
      params = params.append('searchByComputerName', 'true');
    } else {
      params = params.append('searchByComputerName', 'false');
    }
    return params;
  }

  sortComputers(sort: string, page: number, results: number): Observable<Computer[]> {
    let params = this.constructParams(sort);
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    return this.http.get<Computer[]>(this._baseUrl + '/sort', {params: params});
  }

  sortSearchedComputers(search: string, sort: string, page: number, results: number, searchType: string): Observable<Computer[]> {
    let params = this.constructParams(sort);
    params = params.append('search', search);
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    params = this.setupSearchType(searchType, params);
    return this.http.get<Computer[]>(this._baseUrl + '/sort', {params: params});
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
    if (sort === 'introduced_asc') {
      params = params.append('sort', 'introduced');
      params = params.append('asc', 'true');
    }
    if (sort === 'introduced_desc') {
      params = params.append('sort', 'introduced');
      params = params.append('asc', 'false');
    }
    if (sort === 'discontinued_asc') {
      params = params.append('sort', 'discontinued');
      params = params.append('asc', 'true');
    }
    if (sort === 'discontinued_desc') {
      params = params.append('sort', 'discontinued');
      params = params.append('asc', 'false');
    }
    if (sort === 'company_asc') {
      params = params.append('sort', 'company');
      params = params.append('asc', 'true');
    }
    if (sort === 'company_desc') {
      params = params.append('sort', 'company');
      params = params.append('asc', 'false');
    }
    return params;
  }

}
