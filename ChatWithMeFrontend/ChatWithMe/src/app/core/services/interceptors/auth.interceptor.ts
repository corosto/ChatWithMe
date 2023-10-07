import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@core/services/authorization/user.service';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // ! po co to było?
    // if (!this.userService.isAuthenticated()) {
    //   request = request.clone({
    //     setHeaders: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     }
    //   });
    // }


    if (!request.url.includes('geonames'))
      request = request.clone({
        setHeaders: {
          'Authorization': `bearer ${this.userService.getUserToken()}`,
        }
      });

    return next.handle(request);
  }
}
