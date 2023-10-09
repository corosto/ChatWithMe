import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { USER_MOCK } from './mock/mock';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'match',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent {

  USER_MOCK = USER_MOCK;

  currentImage = 0;

  switchImage(side: number): void {
    this.currentImage = this.currentImage + side;
  }
}