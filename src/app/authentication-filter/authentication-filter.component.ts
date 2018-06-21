import { Component } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-authentication-filter',
  templateUrl: './authentication-filter.component.html',
  styleUrls: ['./authentication-filter.component.css']
})
export class AuthenticationFilterComponent implements CanActivate {

  constructor(private service: LoginService, private route: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = sessionStorage.getItem('user');
    if (isNullOrUndefined(user)) {
      sessionStorage.setItem('url', state.url);
      this.route.navigate(['/login']);
      return false;
    }
   if (user.length === 0) {
     console.log('username requis');
     return false;
   }
   let valid = false;
   await this.service.getRolesOfUser(user).toPromise().then(res => {
    if (res.includes('USER')) {
      valid = true;
    } else {
      this.route.navigate(['/login']);
    }
  }).catch(error =>
    console.log('Cette utilisateur n"existe pas')
  );
  return valid;
  }
}
