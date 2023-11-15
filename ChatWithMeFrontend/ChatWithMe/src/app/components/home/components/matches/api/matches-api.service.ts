import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { ToastMessageService } from '@shared/components/toast-message/services/toast-message.service';
import { Observable, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ControllerService } from '@shared/services/controller.service';

@Injectable()
export class MatchesApiService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
    private controllerService: ControllerService,
  ) { }

  getNewMatch(status: Status): Observable<Match> {
    const likedUserId = this.controllerService.getCurrentMatchIdRaw();
    const location = this.controllerService.getUserLocationRaw();

    return this.http.post<Match>(`${environment.httpBackend}${Api.MATCH}`, { likedUserId, status, ...location })
      .pipe(
        tap((res) => this.controllerService.setCurrentMatchId(res ? res.id : null)),
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }

  unmatchUser(userId: number): Observable<unknown> {
    return this.http.post<unknown>(`${environment.httpBackend}${Api.UNMATCH}`, { userId, chatId: this.controllerService.getCurrentChatDataRaw().chatId })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }

  blockUser(userId: number): Observable<unknown> {
    return this.http.post<unknown>(`${environment.httpBackend}${Api.BLOCK}`, { userId, chatId: this.controllerService.getCurrentChatDataRaw().chatId })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastMessageService.notifyOfError(err.statusText);
          return of(null);
        })
      );
  }
}

export enum Status {
  Dislike,
  SuperLike,
  Like,
  Blocked,
}