import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TokenData, UserAuthorization } from '@components/landing-page/interfaces/authentication-interface';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { UserService } from '@core/services/authorization/user.service';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { addSeconds } from 'date-fns';
import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthenticationService {

  readonly token: UserAuthorization = {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZWxvLnBsIiwiZXhwIjoiMTIzMTMyMzEyIiwiZmlyc3ROYW1lIjoiVGVzdCIsImlkIjoiMCIsImxhc3ROYW1lIjoiU2llbWEifQ.HShV2dcPwtcFBwtD5SbcK-Bb2qoYmeuUQx-fhK4KDIE',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZWxvLnBsIiwiZXhwIjoiMTIzMTMyMzEyIiwiZmlyc3ROYW1lIjoiVGVzdCIsImlkIjoiMCIsImxhc3ROYW1lIjoiU2llbWEifQ.HShV2dcPwtcFBwtD5SbcK-Bb2qoYmeuUQx-fhK4KDIE'
  };

  constructor(
    private http: HttpClient,
    // private toastMessageService: ToastMessageService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
  ) { }

  register(form: FormGroup): Observable<boolean> {
    console.log(form);
    this.setUserStorage(this.token);
    return of(true);
  }

  login(form: FormGroup): Observable<boolean> {


    // return this.http.post<UserAuthorization>(`${environment.httpBackend}${Api.LOGIN}`, { ...userData, grantType: "password" }).pipe(
    //   tap((token) => {
    //     this.setUserStorage(token);
    //     this.userService.setUserToken(token.accessToken);
    //   }),
    //   catchError((err: HttpErrorResponse) => {
    //     const error = err.error as string[];
    //     this.toastMessageService.notifyOfError(error[0]);
    //     return of(null);
    //   })
    // );


    console.log(form);
    this.setUserStorage(this.token);
    return of(true);
  }

  logout(): Observable<unknown> {
    // return this.http.post(`${environment.httpBackend}${Api.LOGOUT}`, {}).pipe(
    //   catchError((err: HttpErrorResponse) => {
    //     const error = err.error as string[];
    //     this.toastMessageService.notifyOfError(error[0]);
    //     return of(null);
    //   })
    // );

    return of(true);
  }

  private setUserStorage(token: UserAuthorization): void {
    const decodedToken: TokenData = jwt_decode(token.accessToken);

    this.userService.setUserToken(token.accessToken);

    const { email, exp, firstName, id } = decodedToken;
    const refreshToken = token.refreshToken;

    this.localStorageService.setItem<TokenData>(KeyStorage.USER, {
      refreshToken, email, firstName, id, expires_at: addSeconds(new Date(), exp).toISOString()
    });
  }
}
