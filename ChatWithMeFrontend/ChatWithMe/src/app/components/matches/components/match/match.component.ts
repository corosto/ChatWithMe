import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Match } from '@components/matches/components/match/mock/mock';
import { MatchesService } from '@components/matches/service/matches.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'match',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent implements OnInit {

  @Input() match: Match;

  currentImage$: Observable<number> = of(0);

  constructor(
    private matchesService: MatchesService,
  ) { }

  ngOnInit(): void {
    this.currentImage$ = this.matchesService.getImageSwipeListener();
  }

  switchImage(side: number): void {
    this.matchesService.setImageSwipeListener(side);
  }
}