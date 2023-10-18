/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LikeTypes, Match } from '@components/matches/components/match/mock/mock';
import { MoreInfoComponent } from '@components/matches/components/more-info/more-info.component';
import { MouseActionsComponent } from '@components/matches/components/mouse-actions/mouse-actions.component';
import { MatchesService } from '@components/matches/service/matches.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

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
  swipeAction$ = new BehaviorSubject<LikeTypes>(null);

  constructor(
    private matchesService: MatchesService,
  ) { }

  ngOnInit(): void {
    this.currentImage$ = this.matchesService.getImageSwipeListener();
    this.expanded$ = this.matchesService.getProfileClosedListener();

    this.matchesService.getMatchSwipeListener().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.swipeAction$.next(res);

      setTimeout(() => {
        this.swipeAction$.next(null);
      }, 1250);
    });
  }

  toggleOpened(): void {
    this.matchesService.setProfileClosedToggleListener();
  }

  switchImage(side: number): void {
    this.matchesService.setImageSwipeListener(side);
  }
}