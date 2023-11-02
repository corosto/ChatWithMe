import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Match } from '@components/home/components/matches/components/match/mock/mock';
import { LookingForBoxComponent } from '@shared/components/looking-for-box/looking-for-box.component';
import { GenderPipe } from '@shared/pipes/gender.pipe';

@Component({
  selector: 'more-info',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule, LookingForBoxComponent, GenderPipe],
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoreInfoComponent {
  @Input() match: Match;
  @Input() isUserProfile = false;
}
