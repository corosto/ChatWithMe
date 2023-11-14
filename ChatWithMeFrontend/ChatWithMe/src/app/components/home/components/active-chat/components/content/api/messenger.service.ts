/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { UserChatService } from '@components/home/components/active-chat/components/content/api/user-chat.service';
import { UserService } from '@core/services/authorization/user.service';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private hubConnection: signalR.HubConnection;
  private authorId: string;
  private authorName: string;
  private receiverSet = false;

  private isConnected$ = new BehaviorSubject<boolean>(false);

  constructor(
    private userService: UserService,
    private userChatService: UserChatService,
  ) { }

  buildConnection(): void {
    this.hubConnection = new HubConnectionBuilder().configureLogging(LogLevel.None).withUrl('http://localhost:5207/chat').build();

    this.authorId = this.userService.userAuthorization().userId;
    this.authorName = this.userService.userAuthorization().name;

    this.startConnection();
  }

  //Wyjście z zakładki czatu
  leaveChatTab() {
    this.hubConnection.invoke("LeaveChat", this.authorId)
      .catch((err) => console.log(err));
  }

  //Wysyłanie wiadomości
  sendMessage(message: string, chatId: number) {
    this.hubConnection.invoke("SendMessage", chatId, this.authorId, this.authorName, message)
      .catch((err) => console.log(err));
  }

  //Historia chatów
  restoreAllConversations() {
    this.hubConnection.invoke("RestoreAllConversations", this.authorId)
      .catch((err) => console.log(err));
  }

  // Przywrócenie wszystkich wiadomości z danego chatu
  restoreMessages(chatId: number) {
    this.hubConnection.invoke("RestoreMessages", chatId, this.authorId)
      .catch((err) => console.log(err));
  }

  get isConnectedObservable(): Observable<boolean> {
    return this.isConnected$.asObservable();
  }

  get isConnectedRaw(): boolean {
    return this.isConnected$.value;
  }

  private startConnection() {
    this.hubConnection.start()
      .then(() => {
        this.hubConnection.invoke("Join", this.authorId)
          .then(() => this.isConnected$.next(true))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    if (!this.receiverSet)
      this.setReceiver();
  }

  private setReceiver(): void {
    this.receiverSet = true;

    //Otrzymanie wiadomości
    this.hubConnection.on("ReceiveMessage", (chatId: number, authorId: number, authorName: string, date: Date, content: string) => {
      this.userChatService.setMessageStream({ chatId, authorId, authorName, date, content, fromCurrentUser: authorId === Number(this.authorId) });
    });


    //Przywrócenie wszystkich konwersacji pojedynczo
    this.hubConnection.on("ReceiveConversation", (id: number, withUser: string, withUserId: number, date: Date, content: string,
      isRead: boolean, userImage: string, isSuperLiked: boolean) => {
      this.userChatService.setPreviousChatsStream({ id, withUser, withUserId, date, content, isRead, userImage, isSuperLiked });
    });


    //Informacja o nowej konwersacji
    this.hubConnection.on("ConversationCreated", (firstUserId: number, firstUserName: string, firstUserImage: string,
      firstUserSuperLiked: boolean, secondUserId: number, secondUserName: string, secondUserImage: string, secondUserSuperLiked: boolean) => {
      this.userChatService.setNewConversationCreated({
        firstUserId, firstUserName, firstUserImage,
        firstUserSuperLiked, secondUserId, secondUserName, secondUserImage, secondUserSuperLiked
      });
    });
  }
}
