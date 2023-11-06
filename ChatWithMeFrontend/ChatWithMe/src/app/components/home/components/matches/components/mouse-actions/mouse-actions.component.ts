import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Status } from '@components/home/components/matches/api/matches-api.service';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { MatchService } from '@components/home/services/match.service';

@Component({
  selector: 'mouse-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mouse-actions.component.html',
  styleUrls: ['./mouse-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MouseActionsComponent {

  @Input() isExpanded: boolean;

  Status = Status;

  actions: { icon: string, value: Status }[] = [
    {
      icon: 'cancel',
      value: Status.Dislike,
    },
    {
      icon: 'star',
      value: Status.SuperLike,
    },
    {
      icon: 'heart',
      value: Status.Like,
    },
  ];

  constructor(
    private matchesService: MatchesService,
    private matchService: MatchService,
  ) { }

  action(action: Status): void {
    if (this.matchService.getCurrentMatchId())
      switch (action) {
        case Status.Like:
          this.matchesService.setMatchSwipeListener(Status.Like);
          break;
        case Status.Dislike:
          this.matchesService.setMatchSwipeListener(Status.Dislike);
          break;
        case Status.SuperLike:
          this.matchesService.setMatchSwipeListener(Status.SuperLike);
          break;
      }
  }
}
