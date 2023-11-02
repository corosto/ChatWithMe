import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from '@components/settings/components/user-profile/user-profile.component';
import { UserSettingsPanelComponent } from '@components/settings/components/user-settings-panel/user-settings-panel.component';
import { MatchesService } from '@components/home/components/matches/service/matches.service';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule, UserProfileComponent, UserSettingsPanelComponent],
  providers: [MatchesService],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

}
