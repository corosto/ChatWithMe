import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private userLocation$ = new BehaviorSubject<Location>(null);
  private currentChatData$ = new BehaviorSubject<ChatData>(null);
  private currentChatUserId$ = new BehaviorSubject<number>(null);
  private currentMatchId$ = new BehaviorSubject<number>(null);

  setCurrentChatUserId(value: number): void {
    this.currentChatUserId$.next(value);
  }

  getCurrentChatUserId(): Observable<number> {
    return this.currentChatUserId$.asObservable();
  }

  setCurrentChatData(value: ChatData): void {
    this.currentChatData$.next(value);
  }

  getCurrentChatData(): Observable<ChatData> {
    return this.currentChatData$.asObservable();
  }

  getCurrentChatIdRaw(): number {
    return this.currentChatData$?.value?.id;
  }

  setUserLocation(value: Location): void {
    this.userLocation$.next(value);
  }

  getUserLocation(): Location {
    return this.userLocation$.value;
  }

  setCurrentMatchId(value: number): void {
    this.currentMatchId$.next(value);
  }

  getCurrentMatchId(): Observable<number> {
    return this.currentMatchId$.asObservable();
  }

  getCurrentMatchIdRaw(): number {
    return this.currentMatchId$.value;
  }
}

export interface Location {
  currentWidth: number,
  currentHeight: number,
}

export interface ChatData {
  id: number,
  isSuperLiked: boolean,
}