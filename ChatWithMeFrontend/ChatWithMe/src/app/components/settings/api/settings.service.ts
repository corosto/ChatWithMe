/* eslint-disable prefer-const */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { City } from '@shared/components/city/city.component';
import { ToastMessageService } from '@shared/components/toast-message/services/toast-message.service';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({ providedIn: 'root' })
export class SettingsService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  getUserMainData(): Observable<Match> {
    return this.http.get<Match>(`${environment.httpBackend}${Api.USER_MAIN}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }

  updateUserMainData(value: MainData): Observable<boolean> {
    const formData = new FormData();
    formData.append('Height', value.height);
    formData.append('Weight', value.weight);
    formData.append('Sex', value.sex);
    formData.append('LookingFor', value.lookingFor);
    formData.append('Description', value.description ?? '');
    formData.append('Zodiac', value.zodiac ?? '');
    formData.append('Education', value.education ?? '');
    formData.append('Kids', value.kids ?? '');
    formData.append('Pets', value.pets ?? '');
    formData.append('Alcohol', value.alcohol ?? '');
    formData.append('Smoking', value.smoking ?? '');
    formData.append('Gym', value.gym ?? '');
    formData.append('Diet', value.diet ?? '');
    formData.append('School', value.school ?? '');
    formData.append('Job', value.job ?? '');
    formData.append('Position', value.position ?? '');

    value.interests.forEach((interest) => {
      formData.append('Interests', interest);
    });

    value.sexualOrientations.forEach((sexualOrientation) => {
      formData.append('SexualOrientations', sexualOrientation);
    });

    value.images.forEach((image) => {
      formData.append('Images', image);
    });

    return this.http.put(`${environment.httpBackend}${Api.USER_MAIN}`, formData)
      .pipe(
        map(() => true),
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(false);
        })
      );
  }

  getUserSideData(): Observable<SideData> {
    return this.http.get<SideData>(`${environment.httpBackend}${Api.USER_SIDE}`)
      .pipe(
        map((res) => ({
          ...res,
          cityChosen: {
            Name: res.city.name,
            FullPlaceName: res.city.fullPlaceName,
            Height: res.city.height,
            Width: res.city.width,
          },
          cityInput: res.city.fullPlaceName,
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

export interface MainData {
  height: string,
  weight: string,
  sex: string,
  description: string,
  zodiac: string,
  education: string,
  kids: string,
  pets: string,
  alcohol: string,
  smoking: string,
  gym: string,
  diet: string,
  school: string,
  job: string,
  position: string,
  lookingFor: string,
  images: string[],
  interests: string[],
  sexualOrientations: string[],
}