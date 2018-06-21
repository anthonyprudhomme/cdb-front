import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() switchLanguage: EventEmitter<string> = new EventEmitter();
  isLoggedIn = true;

  constructor(private service: LoginService, private route: Router) { }

  switchTo(locale: string) {
    this.switchLanguage.emit(locale);
  }

  logout() {
    this.service.logout().subscribe();
    this.route.navigate(['/login']);
  }
}
