import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MessengerService } from '@components/home/components/active-chat/components/content/api/messenger.service';
import { UserChatService } from '@components/home/components/active-chat/components/content/api/user-chat.service';
import { MessageStream } from '@components/home/components/active-chat/components/content/interfaces/chat.interfaces';
import { MessengerDatePipe } from '@shared/pipes/messenger-date.pipe';
import { ShowHourPipe } from '@shared/pipes/show-hour.pipe';
import { ControllerService } from '@shared/services/controller.service';
import { compareAsc } from 'date-fns';
import { isEmpty } from 'lodash';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'content',
  standalone: true,
  imports: [CommonModule, MessengerDatePipe, ShowHourPipe],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit, OnDestroy {

  @Output() isSuperLiked = new EventEmitter<boolean>();

  private onDestroy$ = new Subject<void>();

  messages$ = new BehaviorSubject<MessageStream[]>([]);

  constructor(
    protected userChatService: UserChatService,
    private messengerService: MessengerService,
    private controllerService: ControllerService,
  ) { }

  ngOnInit(): void {
    this.controllerService.getCurrentChatDataObservable().pipe(
      filter((res) => !isEmpty(res)),
      tap(() => this.messengerService.leaveChatTab()),
      tap(() => this.messages$.next([])),
      tap((res) => this.messengerService.restoreMessages(res.chatId)),
      tap((res) => this.isSuperLiked.emit(res.isSuperLiked)),
      switchMap(() => this.userChatService.getMessageStream()),
      tap((res) => this.messages$.next([...this.messages$.value, res])),
      tap(() => this.messages$.value.sort((a, b) => compareAsc(new Date(a?.date), new Date(b?.date)))),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.messengerService.leaveChatTab();
    this.controllerService.setCurrentChatData(null);
    this.userChatService.setMessageStream(null);

    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
