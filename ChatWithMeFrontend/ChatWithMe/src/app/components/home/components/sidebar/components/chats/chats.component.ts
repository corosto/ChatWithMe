import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LAST_CHATS } from '@components/home/components/sidebar/interfaces/chat.interface';
import { MatchService } from '@components/home/services/match.service';

@Component({
  selector: 'chats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsComponent {

  LAST_CHATS = LAST_CHATS;

  constructor(
    protected matchService: MatchService,
  ) { }
}
