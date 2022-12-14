import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({ headers: request.headers.append('ngrok-skip-browser-warning', 'prueba') });
    const tokenAuth = localStorage.getItem('token') || "";
    const authorization = clonedRequest.clone({ headers: request.headers.set('Authorization', tokenAuth) });
    return next.handle(authorization);
  }
}
