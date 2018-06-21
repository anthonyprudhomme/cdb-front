import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private service: LoginService, private route: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.pattern(/^\S+[a-zA-Z0-9]$/), Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    const promise = this.service.login(this.username, this.password).subscribe(
      res => { console.log('error'); },
      err => { const url = sessionStorage.getItem('url');
        if (isNullOrUndefined(url)) {
          this.route.navigate(['/company']);
        } else {
          this.route.navigate([url]);
        }
        sessionStorage.setItem('user', this.username); });
  }
}
