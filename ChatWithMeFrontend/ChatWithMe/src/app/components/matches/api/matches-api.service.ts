import { Injectable } from '@angular/core';
import { MOCKS, Match } from '@components/matches/components/match/mock/mock';
import { Observable, of } from 'rxjs';

@Injectable()
export class MatchesApiService {

  private iteration = 0;

  getNewMatch(): Observable<Match> {

    const value = MOCKS[this.iteration];

    if (this.iteration >= MOCKS.length-1)
      this.iteration = 0;
    else
      this.iteration++;

    return of(value);
  }
}
