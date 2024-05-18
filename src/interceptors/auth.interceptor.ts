import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from "../shared/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  LOCAL_STORAGE_KEY = "microbot-id"

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  localStorage.getItem(this.LOCAL_STORAGE_KEY) // Replace with the actual token retrieval logic

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `${token}`)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
