import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { City } from '@shared/components/city/city.component';
import { ToastMessageService } from '@shared/components/toast-message/services/toast-message.service';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class SettingsService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  getUserSideData(): Observable<SideData> {
    return this.http.get<SideData>(`${environment.httpBackend}${Api.USER_SIDE}`)
      .pipe(
        map((res) => ({
          ...res,
          city: {
            Name: res.city.name,
            FullPlaceName: res.city.fullPlaceName,
            Height: res.city.height,
            Width: res.city.width,
          }
        })),
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }

  updateUserSideData(value: SideData): Observable<boolean> {

    let { cityInput, cityChosen, ...rest } = value;

    rest = {
      ...rest,
      city: cityChosen,
    };

    return this.http.put(`${environment.httpBackend}${Api.USER_SIDE}`, rest)
      .pipe(
        map(() => true),
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(false);
        })
      );
  }
}

export interface SideData {
  email: string,
  lookingForAgeMax: number,
  lookingForAgeMin: number,
  lookingForDistanceMax: number,
  showMe: string,
  useAgeFilter: boolean,
  useDistanceFilter: boolean,
  city?: City,
  cityChosen?: City,
  cityInput?: string,
}