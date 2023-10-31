import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Register, TokenData, UserAuthorization } from '@components/landing-page/interfaces/authentication-interface';
import { Api } from '@core/enums/api.enum';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { UserService } from '@core/services/authorization/user.service';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { environment } from '@env/environment';
import { City } from '@shared/components/city/city.component';
import { ToastMessageService } from '@shared/components/toast-message/services/toast-message.service';
import { addSeconds } from 'date-fns';
import jwt_decode from 'jwt-decode';
import { orderBy, uniqBy } from 'lodash';
import { Observable, catchError, map, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
  ) { }

  register(value: Register): Observable<boolean> {

    const formData = new FormData();
    formData.append('Name', value.name);
    formData.append('Email', value.email);
    formData.append('Password', value.password);
    formData.append('ConfirmedPassword', value.confirmedPassword);
    formData.append('Height', value.height);
    formData.append('Width', value.weight);
    formData.append('BirthDate', value.birthDate);
    formData.append('Sex', value.sex);
    formData.append('City', JSON.stringify(value.cityChosen));
    formData.append('ShowMe', value.showMe);
    formData.append('LookingFor', value.lookingFor);
    formData.append('Description', value.description);
    formData.append('Zodiac', value.zodiac);
    formData.append('Kids', value.kids);
    formData.append('Pets', value.pets);
    formData.append('Alcohol', value.alcohol);
    formData.append('Smoking', value.smoking);
    formData.append('Gym', value.gym);
    formData.append('Diet', value.diet);
    formData.append('School', value.school);
    formData.append('Job', value.job);
    formData.append('Position', value.position);

    value.interests.forEach((interest) => {
      formData.append('Interests', interest);
    });

    value.sexualOrientations.forEach((sexualOrientation) => {
      formData.append('SexualOrientations', sexualOrientation);
    });

    value.imagesToSend.forEach((image) => {
      formData.append('Images', image);
    });

    return this.http.post<UserAuthorization>(`${environment.httpBackend}${Api.REGISTER}`, formData)
      .pipe(
        tap((token) => this.setUserStorage(token)),
        map(() => true),
        catchError((err: HttpErrorResponse) => {
          const error = err.error as string[];
          this.toastMessageService.notifyOfError(error[0]);
          return of(null);
        })
      );
  }

  login(form: FormGroup): Observable<boolean> {

    const userData = {
      ...form.value,
      grantType: 'password',
    };

    return this.http.post<UserAuthorization>(`${environment.httpBackend}${Api.LOGIN}`, userData)
      .pipe(
        tap((token) => this.setUserStorage(token)),
        map(() => true),
        catchError((err: HttpErrorResponse) => {
          const error = err.error as string[];
          this.toastMessageService.notifyOfError(error[0]);
          return of(null);
        })
      );
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

  getCities(placeName: string): Observable<{ text: string, value: City }[]> {
    const params = new HttpParams()
      .set('country', 'PL')
      .set('placename_startsWith', placeName)
      .set('maxRows', '500')
      .set('featureClass', 'P')
      .set('username', 'corosto');

    const endpoint = `http://api.geonames.org/postalCodeSearchJSON`;
    return this.http.get<GeoNames>(endpoint, { params }).pipe(
      map((res) => res.postalCodes),
      map((res) => uniqBy(res, 'adminCode3')),
      map((res) => orderBy(res, 'placeName', 'asc')),
      map((res) => {
        return res.map((result) => {
          return {
            text: `${result?.placeName}, ${result?.adminName2}`,
            value: { Name: result?.placeName, Height: result?.lat, Width: result?.lng },
          };
        });
      }),
      catchError(() => of([])),
    );
  }

  private setUserStorage(token: UserAuthorization): void {
    const decodedToken: TokenData = jwt_decode(token.accessToken);

    this.userService.setUserToken(token.accessToken);

    const { exp, userId } = decodedToken;
    const refreshToken = token.refreshToken;

    this.localStorageService.setItem<TokenData>(KeyStorage.USER, {
      refreshToken, userId, expires_at: addSeconds(new Date(), exp).toISOString()
    });
  }
}

interface GeoNames {
  postalCodes: {
    adminCode1: string,
    adminCode2: string,
    adminCode3: string,
    adminName1: string,
    adminName2: string,
    adminName3: string,
    countryCode: string,
    lat: number,
    lng: number,
    placeName: string,
    postalCode: string,
  }[]
}