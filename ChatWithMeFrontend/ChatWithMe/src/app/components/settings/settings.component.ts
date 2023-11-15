import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { UserProfileComponent } from '@components/settings/components/user-profile/user-profile.component';
import { UserSettingsPanelComponent } from '@components/settings/components/user-settings-panel/user-settings-panel.component';
import { ControllerService } from '@shared/services/controller.service';

@Component({
  selector: 'settings',
  standalone: true,
  imports: [CommonModule, UserProfileComponent, UserSettingsPanelComponent],
  providers: [MatchesService],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  constructor(
    private controllerService: ControllerService
  ) { }

  ngOnInit(): void {
    this.controllerService.setCurrentMatchId(null);
  }
}
