import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public URL = 'http://localhost:4001/api/v1';

  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public http: HttpClient, public router: Router) {}

  authSignup(signupData: any) {
    return this.http.post(`${this.URL}/auth/signup`, signupData);
  }

  authLogin(emailContact: string, password: string) {
    return this.http.post(`${this.URL}/auth/login`, { emailContact, password });
  }

  authEmployeeSignup(employeeSignupData: any) {
    return this.http.post(
      `${this.URL}/auth/employee/signup`,
      employeeSignupData
    );
  }

  logout() {
    localStorage.removeItem('token');
    // window.location.href = '';
    this.router.navigateByUrl('/').then();

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
