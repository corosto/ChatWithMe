import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { action } from '@components/matches/components/keyboard-actions/constants/actions.const';
import { KeyboardActionsComponent } from '@components/matches/components/keyboard-actions/keyboard-actions.component';
import { MatchComponent } from '@components/matches/components/match/match.component';
import { MatchesService } from '@components/matches/service/matches.service';

@Component({
  selector: 'matches',
  standalone: true,
  imports: [CommonModule, KeyboardActionsComponent, MatchComponent],
  providers: [MatchesService],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent {

  constructor(
    private matchesService: MatchesService,
  ) { }

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