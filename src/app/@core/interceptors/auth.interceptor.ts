import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken: string = '';

  constructor() { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // console.log(AuthInterceptor.accessToken)

    if (window.localStorage.getItem('token')) {
      const req = request.clone({
        setHeaders: {
          // Authorization: `Bearer ${AuthInterceptor.accessToken}`,
          Authorization: `${window.localStorage.getItem('token')}`,
        },
      });
      // console.log('-----------', req);
      return next.handle(req);
    }
    return next.handle(request);
  }
}
