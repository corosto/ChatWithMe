import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessengerService } from '@components/home/components/active-chat/components/content/api/messenger.service';
import { UserChatService } from '@components/home/components/active-chat/components/content/api/user-chat.service';
import { ChatsStream } from '@components/home/components/active-chat/components/content/interfaces/chat.interfaces';
import { NewMatchDialogComponent } from '@components/home/components/sidebar/components/new-match-dialog/new-match-dialog.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { MessengerDatePipe } from '@shared/pipes/messenger-date.pipe';
import { ControllerService } from '@shared/services/controller.service';
import { compareDesc } from 'date-fns';
import { isEmpty } from 'lodash';
import { BehaviorSubject, Subject, map, switchMap } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'chats',
  standalone: true,
  imports: [CommonModule, MessengerDatePipe, LoadingComponent],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject<void>();

  previousChats$ = new BehaviorSubject<ChatsStream[]>([]);
  currentChat$ = new BehaviorSubject<number>(null);
  loaded$ = new BehaviorSubject<boolean>(false);

  constructor(
    private controllerService: ControllerService,
    private messengerService: MessengerService,
    private userChatService: UserChatService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userChatService.getConversationToHide().pipe(
      filter((res) => !!res),
      tap((res) => {
        const previousChats = this.previousChats$.value?.filter((chat) => chat?.id !== res);
        this.previousChats$.next(previousChats);
      }),
      tap(() => this.controllerService.setCurrentChatData(null)),
      tap(() => this.currentChat$.next(null)),
    ).subscribe();

    this.messengerService.isConnectedObservable.pipe(
      filter((res) => !!res),
      tap(() => this.messengerService.restoreAllConversations()),
      tap(() => this.loaded$.next(true)),
      switchMap(() => this.userChatService.getPreviousChatsStream()),
      filter((res) => !!res),
      map((res) => ({
        ...res,
        content: res.content || 'Napisz pierwszy/a...',
        isRead: res.content ? res.isRead : true,
      })),
      map((res) => ({
        ...res,
        isRead: (this.controllerService.getCurrentChatDataRaw()?.chatId === res.id) ? true : res.isRead,
      })),
      tap((res) => {
        const itemIndex = this.previousChats$.value.findIndex((result) => result.id === res.id);
        if (itemIndex === -1)
          this.previousChats$.next([...this.previousChats$.value, res]);
        else
          this.previousChats$.value[itemIndex] = res;
      }),
      tap(() => this.previousChats$.value.sort((a, b) => compareDesc(new Date(a?.date), new Date(b?.date)))),
      tap(() => this.ref.markForCheck()),
      takeUntil(this.onDestroy$),
    ).subscribe();

    this.userChatService.getNewConversationCreated().pipe(
      tap(() => this.messengerService.restoreAllConversations()),
      tap((res) => this.dialog.open(NewMatchDialogComponent, {
        data: res,
        panelClass: 'move-dialog',
        width: '375px',
        height: '570px',
        autoFocus: false,
        disableClose: true,
      })),
    ).subscribe();

    this.controllerService.getCurrentChatDataObservable().pipe(
      filter((res) => isEmpty(res)),
      tap(() => this.currentChat$.next(null)),
      tap(() => this.ref.markForCheck()),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.userChatService.setPreviousChatsStream(null);
    this.currentChat$.next(null);

    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  changeCurrentChat(chat: ChatsStream) {
    this.controllerService.setCurrentChatData({ chatId: chat.id, withUserId: chat.withUserId, isSuperLiked: chat.isSuperLiked });
    this.currentChat$.next(chat.id);
  }
}
