import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Computer } from './computer.model';
import { Observable, of } from 'rxjs';

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

  searchComputers(search: string, page: number, results: number): Observable<Computer[]> {
    let params = new HttpParams();
    params = params.append('search', search);
    params = params.append('page', String(page));
    params = params.append('results', String(results));
    return this.http.get<Computer[]>(this._baseUrl, {params: params});
  }

  countSearchedComputers(search: string): Observable<number> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get<number>(this._baseUrl + '/count', {params: params});
  }

}
