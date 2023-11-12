/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatchesApiService, Status } from '@components/home/components/matches/api/matches-api.service';
import { NoMoreLikesDialogComponent } from '@components/home/components/matches/components/match/components/no-more-likes-dialog/no-more-likes-dialog.component';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { MouseActionsComponent } from '@components/home/components/matches/components/mouse-actions/mouse-actions.component';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { MatchImageComponent } from '@shared/components/match-image/match-image.component';
import { MoreInfoComponent } from '@shared/components/more-info/more-info.component';
import { OperatorFunction, SchedulerLike, async, concat, publish, take } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'match',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, MouseActionsComponent, MoreInfoComponent, MatchImageComponent, MatDialogModule],
  providers: [MatchesApiService],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent implements OnInit {

  currentMatch$: Observable<Match>;
  expanded$: Observable<boolean>;

  isLoaded$ = new BehaviorSubject<boolean>(false);
  swipeAction$ = new BehaviorSubject<Status>(null);

  constructor(
    private matchesService: MatchesService,
    private matchesApiService: MatchesApiService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentMatch$ = this.matchesService.getMatchSwipeListener().pipe(
      debounceTimeAfterFirst(1230),
      switchMap((res) => this.matchesApiService.getNewMatch(res)),
      tap((res) => {
        if (res.showLikesDialog)
          this.dialog.open(NoMoreLikesDialogComponent, {
            data: res.showLikesDialog,
            panelClass: 'move-dialog',
            width: '375px',
            autoFocus: false,
            scrollStrategy: new NoopScrollStrategy(),
          });
      }),
      tap(() => this.matchesService.forceSetCurrentImageIndex(0)),
      tap(() => this.isLoaded$.next(true)),
      tap((res) => res && this.matchesService.setImagesCount(res.images.length))
    );

    this.matchesService.getMatchSwipeListener().pipe(
      filter((res) => res !== null),
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

export function debounceTimeAfter(amount: number, dueTime: number, scheduler: SchedulerLike = async): OperatorFunction<number, number> {
  return publish((value) => concat(value.pipe(take(amount)), value.pipe(debounceTime(dueTime, scheduler))),);
}

export function debounceTimeAfterFirst(dueTime: number, scheduler: SchedulerLike = async): OperatorFunction<number, number> {
  return debounceTimeAfter(1, dueTime, scheduler);
}