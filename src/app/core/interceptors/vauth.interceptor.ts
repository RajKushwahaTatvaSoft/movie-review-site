import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const authToken = localStorage.getItem('userToken');

  if (authToken) {
    // Clone the request and attach the token
    const authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${authToken}`,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
      },
    });

    return next(authReq).pipe(
      catchError((err) => {
        debugger;
        if ([401, 403].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api

          console.log('unauthorized');

          Swal.fire({
            title: 'Unauthorized',
            text: 'You are not authorized',
            icon: 'warning',
            imageHeight: '10',
            showCloseButton: true,
            showCancelButton: false,
          });

          router.navigate(['unauthorized']);
        }

        // Swal.fire({
        //   title: `Error ${err.status}`,
        //   text: err.error?.message || err.statusText,
        //   icon: 'error',
        //   imageHeight: '10',
        //   showCloseButton: true,
        //   showCancelButton: false,
        // });

        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => error);
      })
    );
  }

  // If there is no token, pass the original request
  return next(req);
};
