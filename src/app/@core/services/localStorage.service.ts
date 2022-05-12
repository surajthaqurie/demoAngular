import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setLocalStorage(key: string, token: string) {
    return localStorage.setItem(key, token);
  }

  removeLocalStorage(key: string) {
    return localStorage.removeItem(key);
  }
}
