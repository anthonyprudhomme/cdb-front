import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private base_url = 'http://localhost:8080/webservice/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);
     const options = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
     withCredentials: true};
    return this.http.post(this.base_url + 'login', body.toString(), options);
  }

  logout() {
     const options = { withCredentials: true};
     sessionStorage.clear();
     return this.http.get(this.base_url + 'logout', options); //  { }, options
  }

  getRolesOfUser(): Observable<string[]> {
    return this.http.get<string[]>(this.base_url + 'user/roles', {withCredentials: true});
  }

  signUp(username: string , password: string) {
    const user = { 'username': username, 'password': password, 'enabled': true};
    JSON.stringify(user);
    return this.http.post(this.base_url + 'user', user);
  }
}
