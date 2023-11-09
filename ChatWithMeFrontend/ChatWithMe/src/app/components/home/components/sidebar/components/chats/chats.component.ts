import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessengerService } from '@components/home/components/active-chat/components/content/api/messenger.service';
import { UserChatService } from '@components/home/components/active-chat/components/content/api/user-chat.service';
import { ChatsStream } from '@components/home/components/active-chat/components/content/interfaces/chat.interfaces';
import { MatchService } from '@components/home/services/match.service';
import { MessengerDatePipe } from '@shared/pipes/messenger-date.pipe';
import { compareDesc } from 'date-fns';
import { BehaviorSubject, Subject, map, switchMap } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'chats',
  standalone: true,
  imports: [CommonModule, MessengerDatePipe],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject<void>();

  previousChats$ = new BehaviorSubject<ChatsStream[]>([]);
  currentChat$ = new BehaviorSubject<number>(null);

  constructor(
    protected matchService: MatchService,
    private userChatService: UserChatService,
    private messengerService: MessengerService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.messengerService.isConnectedObservable.pipe(
      filter((res) => !!res),
      tap(() => this.messengerService.restoreAllConversations()),
      switchMap(() => this.userChatService.getPreviousChatsStream()),
      filter((res) => !!res),
      map((res) => ({
        ...res,
        content: res.content || 'Napisz pierwszy/a...',
        isRead: res.content ? res.isRead : true,
      })),
      map((res) => ({
        ...res,
        isRead: (this.matchService.getCurrentChatIdRaw() === res.id) ? true : res.isRead,
      })),
      tap((res) => {
        const itemIndex = this.previousChats$.value.findIndex((result) => result.id === res.id);
        if (itemIndex === -1)
          this.previousChats$.next([...this.previousChats$.value, res]);
        else
          this.previousChats$.value[itemIndex] = res;
      }),
      tap(() => this.previousChats$.value.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))),
      tap(() => this.ref.markForCheck()),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userChatService.setPreviousChatsStream(null);

    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  changeCurrentChat(chat: ChatsStream) {
    this.matchService.setCurrentChatId(chat.id);
    this.currentChat$.next(chat.id);
    this.matchService.setCurrentChatUserId(chat.withUserId);
  }
}
