import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginGuard implements CanActivate {
  constructor(public $router: Router, public authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userLoginStatus = this.authService.getAuthStatus('token');
    if (userLoginStatus) {

      return this.$router.parseUrl('/');
    }

    console.log('im here----------');
    return true;
  }
}
