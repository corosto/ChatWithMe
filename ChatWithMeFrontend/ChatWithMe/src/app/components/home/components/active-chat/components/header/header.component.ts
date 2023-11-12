import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatchService } from '@components/home/services/match.service';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() isSuperLiked: boolean;
  @Input() matchName: string;

  constructor(
    protected matchService: MatchService,
  ) { }

}
