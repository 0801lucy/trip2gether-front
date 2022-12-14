import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenAuth = localStorage.getItem('token') || "";
    const headers = new HttpHeaders({
      'Authorization': tokenAuth,
      'ngrok-skip-browser-warning': 'prueba'
    });

    const clonedRequest = request.clone({ headers });

    return next.handle(clonedRequest);
  }

}
