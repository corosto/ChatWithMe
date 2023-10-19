import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatchesService } from '@components/home/components/matches/service/matches.service';

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

  actions: { icon: string, value: 'like' | 'dislike' | 'superLike' }[] = [
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

  action(action: 'like' | 'dislike' | 'superLike'): void {
    switch (action) {
      case 'like':
        this.matchesService.setMatchSwipeListener('like');
        break;
      case 'dislike':
        this.matchesService.setMatchSwipeListener('dislike');
        break;
      case 'superLike':
        this.matchesService.setMatchSwipeListener('superLike');
        break;
    }
  }
}
