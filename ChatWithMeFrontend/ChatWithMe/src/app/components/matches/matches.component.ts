import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from '@components/matches/components/actions/actions.component';
import { action } from '@components/matches/components/actions/constants/actions.const';
import { MatchComponent } from '@components/matches/components/match/match.component';

@Component({
  selector: 'matches',
  standalone: true,
  imports: [CommonModule, ActionsComponent, MatchComponent],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchesComponent {

  actionEvent(action: action): void {
    console.log(action);
  }
}
