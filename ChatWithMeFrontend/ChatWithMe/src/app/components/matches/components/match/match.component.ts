import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Match } from '@components/matches/components/match/mock/mock';
import { MoreInfoComponent } from '@components/matches/components/more-info/more-info.component';
import { MouseActionsComponent } from '@components/matches/components/mouse-actions/mouse-actions.component';
import { MatchesService } from '@components/matches/service/matches.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'match',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, MouseActionsComponent, MoreInfoComponent],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent implements OnInit {

  @Input() match: Match;

  currentImage$: Observable<number> = of(0);
  expanded$: Observable<boolean>;

  constructor(
    private matchesService: MatchesService,
  ) { }

  ngOnInit(): void {
    this.currentImage$ = this.matchesService.getImageSwipeListener();

    this.expanded$ = this.matchesService.getProfileClosedListener();
  }

  toggleOpened(): void {
    this.matchesService.setProfileClosedToggleListener();
  }

  switchImage(side: number): void {
    this.matchesService.setImageSwipeListener(side);
  }
}