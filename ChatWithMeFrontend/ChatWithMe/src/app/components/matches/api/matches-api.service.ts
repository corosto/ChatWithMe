import { Injectable } from '@angular/core';
import { Match, USER_MOCK1, USER_MOCK2, USER_MOCK3 } from '@components/matches/components/match/mock/mock';
import { Observable, of } from 'rxjs';

@Injectable()
export class MatchesApiService {

  private iteration = 0;

  getNewMatch(): Observable<Match> {

    let value;

    switch (this.iteration) {
      case 0:
        value = of(USER_MOCK1);
        break;

      case 1:
        value = of(USER_MOCK2);
        break;

      case 2:
        value = of(USER_MOCK3);
        break;
    }

    if (this.iteration >= 2)
      this.iteration = 0;
    else
      this.iteration++;

    return value;
  }
}
