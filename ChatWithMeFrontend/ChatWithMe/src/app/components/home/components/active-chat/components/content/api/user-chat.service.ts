import { Injectable } from '@angular/core';
import { ChatsStream, MessageStream, NewConversationStream } from '@components/home/components/active-chat/components/content/interfaces/chat.interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {

  private messageStream$ = new Subject<MessageStream>;
  private previousChatsStream$ = new Subject<ChatsStream>;
  private newConversationStream$ = new Subject<NewConversationStream>;
  private conversationToHide$ = new Subject<number>;

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

  setNewConversationCreated(newConversation: NewConversationStream): void {
    this.newConversationStream$.next(newConversation);
  }

  getNewConversationCreated(): Observable<NewConversationStream> {
    return this.newConversationStream$.asObservable();
  }

  setConversationToHide(conversationId: number): void {
    this.conversationToHide$.next(conversationId);
  }

  getConversationToHide(): Observable<number> {
    return this.conversationToHide$.asObservable();
  }
}
