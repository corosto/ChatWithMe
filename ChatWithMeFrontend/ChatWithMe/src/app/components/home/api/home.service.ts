import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { ToastMessageService } from '@shared/components/toast-message/services/toast-message.service';
import { ControllerService } from '@shared/services/controller.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class HomeService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
    private controllerService: ControllerService,
  ) { }

  getUserBasicData(): Observable<UserBasicData> {
    return this.http.get<UserBasicData>(`${environment.httpBackend}${Api.USER_BASIC}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }

  getUserChatInfo(userId: number): Observable<Match> {
    return this.http.post<Match>(`${environment.httpBackend}${Api.CHAT_USER}`, { userId, ...this.controllerService.getUserLocationRaw() })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }
}

export interface UserBasicData {
  name: string,
  image: string,
}