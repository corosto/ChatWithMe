import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatsPanelComponent } from '@components/home/components/chats-panel/chats-panel.component';
import { MatchesComponent } from '@components/home/components/matches/matches.component';

@Component({
  selector: 'pp-home',
  standalone: true,
  imports: [CommonModule, MatchesComponent, ChatsPanelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
