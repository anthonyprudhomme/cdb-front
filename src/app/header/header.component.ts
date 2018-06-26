import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() switchLanguage: EventEmitter<string> = new EventEmitter();
  isLoggedIn = false;

  constructor(
    private service: LoginService, private route: Router) { }

  switchTo(locale: string) {
    this.switchLanguage.emit(locale);
  }

  ngOnInit() {
    this.route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.service.getRolesOfUser().toPromise().then(res => {
          if (res.includes('USER')) {
            this.isLoggedIn = true;
          }
        });
      }
    });
  }

  logout() {
    this.service.logout().subscribe();
    this.route.navigate(['/login']);
    this.isLoggedIn = false;
  }
}
