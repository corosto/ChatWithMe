import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { UserInfoComponent } from '@shared/components/user-info/user-info.component';
import { UserSettingsComponent } from '@components/settings/components/user-settings-panel/components/user-settings/user-settings.component';

@Component({
  selector: 'user-settings-panel',
  standalone: true,
  imports: [CommonModule, UserInfoComponent, UserSettingsComponent],
  templateUrl: './user-settings-panel.component.html',
  styleUrls: ['./user-settings-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsPanelComponent {
  UserSettingsComponent = UserSettingsComponent;
  RoutesPath = RoutesPath;
}
