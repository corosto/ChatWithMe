import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Status } from '@components/home/components/matches/api/matches-api.service';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'match-image',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './match-image.component.html',
  styleUrls: ['./match-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchImageComponent implements OnInit {

  @Input({ required: true }) match: Match;
  @Input() set swipeAction(status: Status) {
    switch (status) {
      case Status.Dislike:
        this.matchClass = 'dislike';
        break;
      case Status.SuperLike:
        this.matchClass = 'superLike';
        break;
      case Status.Like:
        this.matchClass = 'like';
        break;
    }
  }
  @Input() expanded = true;
  @Input() hideInfoButton = false;
  @Input() isChat = false;

  Status = Status;
  matchClass: string;

  currentImageIndex$: Observable<number> = of(0);

  constructor(
    private matchesService: MatchesService,
  ) { }

  ngOnInit(): void {
    this.currentImageIndex$ = this.matchesService.getCurrentImageIndex();
  }

  toggleOpened(): void {
    this.matchesService.setProfileClosedToggleListener();
  }

  switchImage(side: number): void {
    this.matchesService.setCurrentImageIndex(side);
  }
}
