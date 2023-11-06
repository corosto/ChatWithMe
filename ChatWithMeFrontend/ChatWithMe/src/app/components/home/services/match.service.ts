import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private chatId$ = new BehaviorSubject<string>(null);
  private userLocation$ = new BehaviorSubject<Location>(null);
  private currentMatchId$ = new BehaviorSubject<number>(null);

  setChatId(value: string): void {
    this.chatId$.next(value);
  }

  getChatId(): Observable<string> {
    return this.chatId$.asObservable();
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

  getCurrentMatchId(): number {
    return this.currentMatchId$.value;
  }
}


export interface Location {
  currentWidth: number,
  currentHeight: number,
}