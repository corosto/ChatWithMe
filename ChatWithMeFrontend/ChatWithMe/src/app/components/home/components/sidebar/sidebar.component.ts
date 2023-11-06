import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatsComponent } from '@components/home/components/sidebar/components/chats/chats.component';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { UserInfoComponent } from '@shared/components/user-info/user-info.component';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, UserInfoComponent, ChatsComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  ChatsComponent = ChatsComponent;
  RoutesPath = RoutesPath;
}
