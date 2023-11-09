import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { MatchService } from '@components/home/services/match.service';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { ToastMessageService } from '@shared/components/toast-message/services/toast-message.service';
import { Observable, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MatchesApiService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
    private matchService: MatchService,
  ) { }

  getNewMatch(status: Status): Observable<Match> {
    const likedUserId = this.matchService.getCurrentMatchIdRaw();
    const location = this.matchService.getUserLocation();

    return this.http.post<Match>(`${environment.httpBackend}${Api.MATCH}`, { likedUserId, status, ...location })
      .pipe(
        tap((res) => this.matchService.setCurrentMatchId(res ? res.id : null)),
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