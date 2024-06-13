import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger;
    const authToken = localStorage.getItem('token');

    if (authToken) {
      // Clone the request and attach the token
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return next.handle(authReq).pipe(
        catchError((err) => {
          debugger;
          if ([401, 403].includes(err.status)) {
            // auto logout if 401 or 403 response returned from api
            this.authService.logoutUser();
          }

          const error = err.error?.message || err.statusText;
          console.error(err);
          return throwError(() => error);
        })
      );
    }

    // If there is no token, pass the original request
    return next.handle(req);
  }
}
