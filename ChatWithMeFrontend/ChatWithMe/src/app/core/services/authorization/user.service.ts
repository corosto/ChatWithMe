import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenData, UserAuthorization } from '@components/landing-page/interfaces/authentication-interface';
import { Api } from '@core/enums/api.enum';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { environment } from '@env/environment';
import { addSeconds, isAfter } from 'date-fns';
import jwt_decode from 'jwt-decode';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userToken: string;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient,
  ) { }

  setUserToken(token: string): void {
    this.userToken = token;
  }

  getUserToken(): string {
    return this.userToken;
  }

  isAuthenticated(): boolean {
    return !isEmpty(this.user());
  }

  userAuthorization(): TokenData {
    return this.user();
  }

  logout(): void {
    this.clearAll();
  }

  isTokenExpired(): boolean {
    const { expires_at } = this.user();

    return isAfter(new Date(), new Date(expires_at));
  }

  refreshToken(): Observable<UserAuthorization> {

    if (isEmpty(this.user()))
      this.clearAll();

    const userData = {
      grantType: 'refresh_token',
      refreshToken: this.user().refreshToken,
    };

    return this.http.post<UserAuthorization>(`${environment.httpBackend}${Api.LOGIN}`, userData)
      .pipe(
        tap((token) => {
          const myToken = token;
          this.setUserStorage(myToken);
          this.setUserToken(myToken.accessToken);
        }),
      );
  }

  private user(): TokenData {
    return this.localStorageService.getItem<TokenData>(KeyStorage.USER);
  }

  private clearAll(): void {
    this.localStorageService.clear();
    void this.router.navigate(['/']);
  }

  private setUserStorage(token: UserAuthorization) {
    const decodedToken: TokenData = jwt_decode(token.accessToken);

    const { exp, name } = decodedToken;
    const refreshToken = token.refreshToken;

    this.localStorageService.setItem<TokenData>(KeyStorage.USER, {
      refreshToken, name, expires_at: addSeconds(new Date(), exp).toISOString()
    });
  }
}
