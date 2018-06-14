import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from './company.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://10.0.1.55:8080/api/v1/recipes';
  id: number;
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this._baseUrl);
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${ this._baseUrl }/${ id }`);
  }

  postCompany(recipe: Company): Observable<Company> {
    return this.http.post<Company>(this._baseUrl, recipe);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this._baseUrl, company);
  }

  deleteCompany(recipe: Company): Observable<Company> {
    return this.http.delete<Company>(`${ this._baseUrl }/${ recipe.id }`);
  }
}
