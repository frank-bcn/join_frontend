import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  /**
   * Intercepts outgoing HTTP requests to append authorization token if available,
   * and handles HTTP errors, such as unauthorized (401) responses, by redirecting to the login page.
   * @param request The HTTP request being intercepted.
   * @param next The HTTP handler for the request.
   * @returns An observable of the HTTP event stream.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Token ${token}` },
      });
      // console.log('Token gesetzt:', token);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => error);
      })
    );
  }
}