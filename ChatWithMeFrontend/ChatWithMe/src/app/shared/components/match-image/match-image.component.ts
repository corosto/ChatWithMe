import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LikeTypes, Match } from '@components/home/components/matches/components/match/mock/mock';
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
  @Input() swipeAction: LikeTypes;
  @Input() expanded = true;
  @Input() isUserProfile = false;

  currentImageIndex$: Observable<number> = of(0);

  constructor(
    private matchesService: MatchesService,
  ) { }

  ngOnInit(): void {
    this.currentImageIndex$ = this.matchesService.getImageSwipeListener();
  }

  toggleOpened(): void {
    this.matchesService.setProfileClosedToggleListener();
  }

  switchImage(side: number): void {
    this.matchesService.setImageSwipeListener(side);
  }
}
