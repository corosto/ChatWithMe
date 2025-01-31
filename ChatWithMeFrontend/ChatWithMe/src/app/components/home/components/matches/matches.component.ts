import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Status } from '@components/home/components/matches/api/matches-api.service';
import { action } from '@components/home/components/matches/components/keyboard-actions/constants/actions.const';
import { KeyboardActionsComponent } from '@components/home/components/matches/components/keyboard-actions/keyboard-actions.component';
import { MatchComponent } from '@components/home/components/matches/components/match/match.component';
import { MatchesService } from '@components/home/components/matches/service/matches.service';

@Component({
  selector: 'matches',
  standalone: true,
  imports: [CommonModule, KeyboardActionsComponent, MatchComponent, MatIconModule],
  providers: [MatchesService],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const width = (event.target as Window).innerWidth;
    this.isSmallWindow = width <= 900;
  }

  isSmallWindow: boolean;

  constructor(
    private matchesService: MatchesService,
  ) { }

  ngOnInit(): void {
    this.isSmallWindow = window.innerWidth <= 900;
  }

  actionEvent(action: action): void {
    switch (action) {
      case 'left':
        this.matchesService.setMatchSwipeListener(Status.Dislike);
        break;
      case 'right':
        this.matchesService.setMatchSwipeListener(Status.Like);
        break;
      case 'up':
        this.matchesService.setProfileClosedListener(true);
        break;
      case 'down':
        this.matchesService.setProfileClosedListener(false);
        break;
      case 'enter':
        this.matchesService.setMatchSwipeListener(Status.SuperLike);
        break;
      case 'space':
        this.matchesService.setCurrentImageIndex(1);
        break;
    }
  }
}