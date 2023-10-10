import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatchesApiService } from '@components/matches/api/matches-api.service';
import { ActionsComponent } from '@components/matches/components/actions/actions.component';
import { action } from '@components/matches/components/actions/constants/actions.const';
import { MatchComponent } from '@components/matches/components/match/match.component';
import { Match } from '@components/matches/components/match/mock/mock';
import { MatchesService } from '@components/matches/service/matches.service';
import { Observable, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'matches',
  standalone: true,
  imports: [CommonModule, ActionsComponent, MatchComponent],
  providers: [MatchesApiService, MatchesService],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent implements OnInit {

  currentMatch$: Observable<Match>;

  constructor(
    private matchesApiService: MatchesApiService,
    private matchesService: MatchesService,
  ) { }

  ngOnInit(): void {
    this.currentMatch$ = this.matchesService.getMatchSwipeListener().pipe(
      switchMap(() => this.matchesApiService.getNewMatch()),
      tap((res) => this.matchesService.setImagesCount(res.images.length))
    );
  }

  actionEvent(action: action): void {
    switch (action) {
      case 'left':
        this.matchesService.setMatchSwipeListener(false);
        break;
      case 'right':
        this.matchesService.setMatchSwipeListener(true);
        break;
      case 'up':
        this.matchesService.setProfileClosedListener(true);
        break;
      case 'down':
        this.matchesService.setProfileClosedListener(false);
        break;
      case 'space':
        this.matchesService.setImageSwipeListener(1);
        break;
    }
  }
}

//dodac akcje na klawie: gora, dol
//dodac przyciski like/dislike/superlike
//wiecej informacji po rozwinieciu opisu(wszystko co jest mozliwe przy rejestracji pokazac)
//animacja like/dislike/superlike(w sensie przesuwanie sie zdjecia w bok i dopiska like/dislike)
//to chyba bedzie koniec matcha, pozniej brac sie za menu z lewej a na koncu chat