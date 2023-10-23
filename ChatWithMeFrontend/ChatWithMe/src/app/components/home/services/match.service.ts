import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private chatId$ = new BehaviorSubject<string>(null);

  setChatId(value: string): void {
    this.chatId$.next(value);
  }

  getChatId(): Observable<string> {
    return this.chatId$.asObservable();
  }
}
