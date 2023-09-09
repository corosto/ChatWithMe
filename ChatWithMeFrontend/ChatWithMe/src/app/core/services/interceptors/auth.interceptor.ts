import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '@core/services/authorization/user.service';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';

@Injectable()
export class AuthInterceptor {
// export class AuthInterceptor implements HttpInterceptor {

  // constructor(
  //   private userService: UserService,
  //   private localStorageService: LocalStorageService,
  // ) { }

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  //   request = request.clone({
  //     setHeaders: {
  //       'Authorization': `bearer ${this.userService.getUserToken()}`,
  //     }
  //   });

  //   return next.handle(request);
  // }
}
