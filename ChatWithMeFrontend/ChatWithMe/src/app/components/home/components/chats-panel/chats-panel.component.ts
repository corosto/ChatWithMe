import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatComponent } from '@components/home/components/chats-panel/components/chat/chat.component';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { UserInfoComponent } from '@shared/components/user-info/user-info.component';

@Component({
  selector: 'chats-panel',
  standalone: true,
  imports: [CommonModule, UserInfoComponent, ChatComponent],
  templateUrl: './chats-panel.component.html',
  styleUrls: ['./chats-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsPanelComponent {
  ChatComponent = ChatComponent;
  RoutesPath = RoutesPath;
}