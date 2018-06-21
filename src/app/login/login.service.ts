import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);
     const options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
     withCredentials: true};
    return this.http.post('http://localhost:8080/webservice/login', body.toString(), options);
  }

  logout() {
     const options = { withCredentials: true};
     sessionStorage.clear();
     return this.http.get('http://localhost:8080/webservice/logout', options); //  { }, options
  }

  getRolesOfUser(name: string): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/webservice/user/' + name + '/roles');
  }
}
