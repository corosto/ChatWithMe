/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatchesApiService } from '@components/home/components/matches/api/matches-api.service';
import { LikeTypes, Match } from '@components/home/components/matches/components/match/mock/mock';
import { MouseActionsComponent } from '@components/home/components/matches/components/mouse-actions/mouse-actions.component';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { MatchImageComponent } from '@shared/components/match-image/match-image.component';
import { MoreInfoComponent } from '@shared/components/more-info/more-info.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'match',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, MouseActionsComponent, MoreInfoComponent, MatchImageComponent],
  providers: [MatchesApiService],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent implements OnInit {

  currentMatch$: Observable<Match>;
  expanded$: Observable<boolean>;
  isLoaded$ = new BehaviorSubject<boolean>(false);

  swipeAction$ = new BehaviorSubject<LikeTypes>(null);

  constructor(
    private matchesService: MatchesService,
    private matchesApiService: MatchesApiService,
  ) { }

  ngOnInit(): void {
    this.currentMatch$ = this.matchesService.getMatchSwipeListener().pipe(
      debounceTime(1230),
      switchMap(() => this.matchesApiService.getNewMatch()),
      tap(() => this.matchesService.forceSetCurrentImageIndex(0)),
      tap(() => this.isLoaded$.next(true)),
      tap((res) => res && this.matchesService.setImagesCount(res.images.length))
    );

    this.matchesService.getMatchSwipeListener().pipe(
      filter((res) => !!res),
    ).subscribe((res) => {
      this.swipeAction$.next(res);
      setTimeout(() => {
        this.isLoaded$.next(false);
      }, 850);

      setTimeout(() => {
        this.swipeAction$.next(null);
      }, 1250);
    });

    this.expanded$ = this.matchesService.getProfileClosedListener();
  }
}
