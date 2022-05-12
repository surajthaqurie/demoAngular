import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/@core/interceptors/auth.interceptor';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnChanges {
  constructor(public authService: AuthService, public router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  errorMessage: string = '';
  successMessage: string = '';

  // Error Message handling
  errFirstName: string = '';
  errLastName: string = '';
  errEmail: string = '';
  errPassword: string = '';
  errContactNo: string = '';
  errAddress: string = '';

  authSignup(signupData: NgForm) {
    if (signupData.invalid) {
      return;
    }
    // Error Message handling
    this.errorMessage = '';
    this.errFirstName = '';
    this.errLastName = '';
    this.errEmail = '';
    this.errPassword = '';
    this.errContactNo = '';
    this.errAddress = '';

    this.authService.authSignup(signupData.value).subscribe({
      next: (result: any) => {
        this.successMessage = result.msg;
        // if check the role for redirected admin

        AuthInterceptor.accessToken = result.token;
        // storing token in local storage
        window.localStorage.removeItem('token');
        window.localStorage.setItem('token', 'Bearer ' + result.token);

        setTimeout(() => {
          this.router.navigateByUrl('/').then();
        }, 1000);

        /* 
        msg: "User signed up successfully"
        status: "Created"
        success: true
        token */
      },
      error: (err) => {
        if (err.error.msg) {
          err.error.msg[0].includes('firstName')
            ? (this.errFirstName = err.error.msg[0])
            : '';

          err.error.msg[0].includes('lastName')
            ? (this.errLastName = err.error.msg[0])
            : '';

          err.error.msg[0].includes('email') || err.error.msg.includes('email')
            ? (this.errEmail =
                err.error.msg[0].length > 1
                  ? err.error.msg[0]
                  : err.error.msg || err.error.msg)
            : '';

          err.error.msg[0].includes('password')
            ? (this.errPassword = err.error.msg[0])
            : '';

          err.error.msg[0].includes('number') ||
          err.error.msg.includes('number')
            ? (this.errContactNo =
                err.error.msg[0].length > 1
                  ? err.error.msg[0]
                  : err.error.msg || err.error.msg)
            : '';

          err.error.msg[0].includes('address')
            ? (this.errAddress = err.error.msg[0])
            : '';
        } else {
          this.errorMessage =
            'Something went wrong please check your connection!!!';
        }
      },
    });
  }
}
