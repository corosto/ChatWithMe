import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveChatComponent } from '@components/home/components/active-chat/active-chat.component';
import { MessengerService } from '@components/home/components/active-chat/components/content/api/messenger.service';
import { MatchesComponent } from '@components/home/components/matches/matches.component';
import { SidebarComponent } from '@components/home/components/sidebar/sidebar.component';
import { ControllerService } from '@shared/services/controller.service';
import { isEmpty } from 'lodash';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'pp-home',
  standalone: true,
  imports: [CommonModule, MatchesComponent, SidebarComponent, ActiveChatComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  chatVisible$: Observable<boolean>;

  constructor(
    private controllerService: ControllerService,
    private messengerService: MessengerService,
  ) { }

  ngOnInit(): void {
    this.chatVisible$ = this.controllerService.getCurrentChatDataObservable().pipe(
      map((res) => !isEmpty(res)),
    );

    if (!this.messengerService.isConnectedRaw)
      this.messengerService.buildConnection();
  }
}
