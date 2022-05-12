import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/@core/interceptors/auth.interceptor';
import { AuthService } from '../services/auth.service';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}
  ngOnInit(): void {}

  successMessage: string = '';
  errorMessage: string = '';

  authLogin(loginForm: NgForm) {
    // console.log(loginForm.value)
    if (loginForm.invalid) {
      return;
    }

    this.errorMessage = '';

    const loginData = {
      emailContact: loginForm.value.emailContact,
      password: loginForm.value.password,
    };

    this.authService
      .authLogin(loginData.emailContact, loginData.password)
      .subscribe({
        next: (result: any) => {
          // console.log(result);
          AuthInterceptor.accessToken = result.token;

          // storing token in local storage
          window.localStorage.removeItem('token');
          window.localStorage.setItem('token', 'Bearer ' + result.token);

          const { role } = this.getDecodedAccessToken(result.token);
          this.successMessage = result.msg;

          if (role[0] === 'admin') {
            setTimeout(() => {
              this.router.navigateByUrl('/admin/dashboard').then();
            }, 1000);
          } else {
            setTimeout(() => {
              // location.reload();
              this.router.navigateByUrl('').then();
            }, 1000);
          }
        },

        error: (err) => {
          this.errorMessage = err.error.msg;
        },
      });
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
