import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveChatComponent } from '@components/home/components/active-chat/active-chat.component';
import { MessengerService } from '@components/home/components/active-chat/components/content/api/messenger.service';
import { MatchesComponent } from '@components/home/components/matches/matches.component';
import { SidebarComponent } from '@components/home/components/sidebar/sidebar.component';
import { MatchService } from '@components/home/services/match.service';
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
    private matchService: MatchService,
    private messengerService: MessengerService,
  ) { }

  ngOnInit(): void {
    this.chatVisible$ = this.matchService.getCurrentChatId().pipe(
      map((res) => !!(res !== null && res !== undefined)),
    );

    if (!this.messengerService.isConnectedRaw)
      this.messengerService.buildConnection();
  }
}
