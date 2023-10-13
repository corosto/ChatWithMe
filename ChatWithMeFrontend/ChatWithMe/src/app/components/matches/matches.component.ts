import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatchesApiService } from '@components/matches/api/matches-api.service';
import { action } from '@components/matches/components/keyboard-actions/constants/actions.const';
import { KeyboardActionsComponent } from '@components/matches/components/keyboard-actions/keyboard-actions.component';
import { MatchComponent } from '@components/matches/components/match/match.component';
import { Match } from '@components/matches/components/match/mock/mock';
import { MatchesService } from '@components/matches/service/matches.service';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'matches',
  standalone: true,
  imports: [CommonModule, KeyboardActionsComponent, MatchComponent],
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
        this.matchesService.setMatchSwipeListener('dislike');
        break;
      case 'right':
        this.matchesService.setMatchSwipeListener('like');
        break;
      case 'up':
        this.matchesService.setProfileClosedListener(true);
        break;
      case 'down':
        this.matchesService.setProfileClosedListener(false);
        break;
      case 'enter':
        this.matchesService.setMatchSwipeListener('superLike');
        break;
      case 'space':
        this.matchesService.setImageSwipeListener(1);
        break;
    }
  }
}

//animacja like/dislike/superlike(w sensie przesuwanie sie zdjecia w bok i dopiska like/dislike)