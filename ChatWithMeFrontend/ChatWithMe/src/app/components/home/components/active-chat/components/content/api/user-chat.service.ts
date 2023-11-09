import { Injectable } from '@angular/core';
import { ChatsStream, MessageStream } from '@components/home/components/active-chat/components/content/interfaces/chat.interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {

  private messageStream$ = new Subject<MessageStream>;
  private previousChatsStream$ = new Subject<ChatsStream>;

  setMessageStream(chat: MessageStream): void {
    this.messageStream$.next(chat);
  }

  getMessageStream(): Observable<MessageStream> {
    return this.messageStream$.asObservable();
  }

  setPreviousChatsStream(chat: ChatsStream): void {
    this.previousChatsStream$.next(chat);
  }

  getPreviousChatsStream(): Observable<ChatsStream> {
    return this.previousChatsStream$.asObservable();
  }
}
