import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.scss']
})
export class LoginCreateComponent implements OnInit {
  username: string;
  password: string;
  passwordConfirmation: string;

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      passwordConfirmation: ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }

  ngOnInit() {
  }

  createAccount() {

  }

}
