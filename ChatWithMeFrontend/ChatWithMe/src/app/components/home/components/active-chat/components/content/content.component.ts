import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessengerService } from '@components/home/components/active-chat/components/content/api/messenger.service';
import { UserChatService } from '@components/home/components/active-chat/components/content/api/user-chat.service';
import { MessageStream } from '@components/home/components/active-chat/components/content/interfaces/chat.interfaces';
import { MatchService } from '@components/home/services/match.service';
import { MessengerDatePipe } from '@shared/pipes/messenger-date.pipe';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'content',
  standalone: true,
  imports: [CommonModule, MessengerDatePipe],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject<void>();

  messages$ = new BehaviorSubject<MessageStream[]>([]);

  constructor(
    protected matchService: MatchService,
    protected userChatService: UserChatService,
    private messengerService: MessengerService,
  ) { }

  ngOnInit(): void {
    this.matchService.getCurrentChatId().pipe(
      filter((res) => !!(res !== null && res !== undefined)),
      tap(() => this.messengerService.leaveChatTab()),
      tap(() => this.messages$.next([])),
      tap((chatId) => this.messengerService.restoreMessages(chatId)),
      switchMap(() => this.userChatService.getMessageStream()),
      tap((res) => this.messages$.next([...this.messages$.value, res])),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.messengerService.leaveChatTab();
    this.matchService.setCurrentChatId(null);
    this.userChatService.setMessageStream(null);

    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
