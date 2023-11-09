import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private userLocation$ = new BehaviorSubject<Location>(null);
  private currentChatId$ = new BehaviorSubject<number>(null);
  private currentChatUserId$ = new BehaviorSubject<number>(null);
  private currentMatchId$ = new BehaviorSubject<number>(null);

  setCurrentChatUserId(value: number): void {
    this.currentChatUserId$.next(value);
  }

  getCurrentChatUserId(): Observable<number> {
    return this.currentChatUserId$.asObservable();
  }

  setCurrentChatId(value: number): void {
    this.currentChatId$.next(value);
  }

  getCurrentChatId(): Observable<number> {
    return this.currentChatId$.asObservable();
  }

  getCurrentChatIdRaw(): number {
    return this.currentChatId$.value;
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