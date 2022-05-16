import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { localStorageService } from './localStorage.service';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public $http: HttpClient,
    public $router: Router,
    public localStorage: localStorageService
  ) {}

  // Check token is expires or not
  getAuthStatus(key: string): boolean {
    const tokenStatus = this.localStorage.getLocalStorage(key);
    // const tokenStatus = jwt_decode(token);
    if (tokenStatus) {
      return true;
    } else {
      return false;
    }
  }

  getUserStatus(key: string) {
    const token = this.localStorage.getLocalStorage(key);
    if (token) {
      const user: any = this.decodeAccessToken(token);
      // console.log('-------------------', user); //  exp: 1652281098 ms  and new Date().getTime()
      if (user.role[0] === 'admin') {
        return 'admin';
      }

      if (user.role[0] === 'employee') {
        return 'employee';
      }

      return 'user';
    }
    return null;
  }

  getDecodedUser(key: string) {
    const token = this.localStorage.getLocalStorage(key);
    if (token) {
      const user: any = this.decodeAccessToken(token);
      if (user) {
        return user;
      } else {
        null;
      }
    }
  }
  decodeAccessToken(token: string) {
    try {
      // console.log(jwt_decode(token));

      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }
}
