import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private service: LoginService,
    private route: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService) {
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
    if (this.loginForm.valid) {
      this.username = this.loginForm.value.username;
      this.password = this.loginForm.value.password;
      this.service.login(this.username, this.password).toPromise().then(
        res => { console.log(res);
      }).catch(error =>  {
        if (error.status === 200) {
          const url = sessionStorage.getItem('url');
          if (isNullOrUndefined(url)) {
            this.route.navigate(['/company']);
          } else {
            this.route.navigate([url]);
          }
        } else {
          this.openSnackBar(this.translate.instant('LOGIN.ERROR.INCORRECT'), 'fail-snackbar');
        }
      });
    }
  }

  submit(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  openSnackBar(message: string, className: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = [className];
    config.horizontalPosition = 'end';
    this.snackBar.open(message, 'OK', config);
  }
}
