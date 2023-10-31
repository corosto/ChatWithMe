import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { ToastMessageService } from '@shared/components/toast-message/services/toast-message.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class HomeService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  getUserBasicData(): Observable<any> {
    return this.http.get<any>(`${environment.httpBackend}${Api.USER_BASIC}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }

  getUserAllData(): Observable<any> {
    return this.http.get<any>(`${environment.httpBackend}${Api.USER_ALL}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }
}