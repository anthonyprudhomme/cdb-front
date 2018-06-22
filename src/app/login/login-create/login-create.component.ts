import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

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
  constructor(private formBuilder: FormBuilder, private service: LoginService, private route: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.pattern(/^\S+[a-zA-Z0-9]{4,}$/), Validators.required]],
      password: ['', [Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/), Validators.required]],
      passwordConfirmation: ['', Validators.required]
    }, {validator: this.checkIfMatchingPasswords('password', 'passwordConfirmation')});
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
          return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  createAccount() {
    if (this.loginForm.valid) {
      console.log("connard");
     this.service.signUp(
       this.loginForm.value.username,
       this.loginForm.value.password).toPromise().then(
         res => this.route.navigate(['/login'])
       ).catch(
         res => { if (res.status === 200) {
          this.route.navigate(['/login']);
         } else {
          console.log(res);
         }
       });
    }
  }

  submit(event) {
    if (event.keyCode === 13) {
      this.createAccount();
    }
  }


}
