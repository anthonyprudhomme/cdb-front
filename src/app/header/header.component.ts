import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() switchLanguage: EventEmitter<string> = new EventEmitter();
  isLoggedIn = true;

  constructor() { }

  ngOnInit() {
  }

  switchTo(locale: string) {
    this.switchLanguage.emit(locale);
  }
}
