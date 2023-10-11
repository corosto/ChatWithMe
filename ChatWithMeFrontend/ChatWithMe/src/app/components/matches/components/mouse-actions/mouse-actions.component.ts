import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatchesService } from '@components/matches/service/matches.service';

@Component({
  selector: 'mouse-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mouse-actions.component.html',
  styleUrls: ['./mouse-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MouseActionsComponent {
  actions: { icon: string, value: 'like' | 'superLike' | 'dislike' }[] = [
    {
      icon: 'cancel',
      value: 'dislike',
    },
    {
      icon: 'star',
      value: 'superLike',
    },
    {
      icon: 'heart',
      value: 'like',
    },
  ];

  constructor(
    private matchesService: MatchesService,
  ) { }

  action(action: 'like' | 'superLike' | 'dislike'): void {
    if (action === 'like' || action === 'superLike')
      this.matchesService.setMatchSwipeListener(true);
    else
      this.matchesService.setMatchSwipeListener(false);
  }
}
