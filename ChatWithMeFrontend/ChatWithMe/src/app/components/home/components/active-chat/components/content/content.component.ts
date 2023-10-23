import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONVERSATION } from '@components/home/components/active-chat/components/content/interfaces/conversation.interface';
import { MessengerDatePipe } from '@shared/pipes/messenger-date.pipe';

@Component({
  selector: 'content',
  standalone: true,
  imports: [CommonModule, MessengerDatePipe],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  CONVERSATION = CONVERSATION.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
}
