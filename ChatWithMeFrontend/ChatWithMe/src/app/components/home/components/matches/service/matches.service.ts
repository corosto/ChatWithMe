import { Injectable } from '@angular/core';
import { LikeTypes } from '@components/home/components/matches/components/match/mock/mock';
import { differenceInMilliseconds } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MatchesService {

  private currentImageIndexListener$ = new BehaviorSubject<number>(0);
  private matchSwipeListener$ = new BehaviorSubject<LikeTypes>(null);
  private profileOpenClosedListener$ = new BehaviorSubject<boolean>(false);
  private imagesCount$ = new BehaviorSubject<number>(null);

  private previousTime: Date;


  // 1 - następne zdjęcie, -1 poprzednie zdjęcie
  setCurrentImageIndex(data: number) {
    const value = this.currentImageIndexListener$.value + data;

    if (value < this.imagesCount$.value)
      this.currentImageIndexListener$.next(value);
  }

  forceSetCurrentImageIndex(value: number): void {
    this.currentImageIndexListener$.next(value);
  }

  getCurrentImageIndex(): Observable<number> {
    return this.currentImageIndexListener$.asObservable();
  }

  setMatchSwipeListener(data: LikeTypes) {
    const now = new Date();
    const millisecondsSincePreviousEvent = differenceInMilliseconds(now, this.previousTime);

    if (millisecondsSincePreviousEvent >= 1250 || !this.previousTime) {
      this.previousTime = new Date();
      this.profileOpenClosedListener$.next(false);
      this.matchSwipeListener$.next(data);
    }
  }

  getMatchSwipeListener(): Observable<LikeTypes> {
    return this.matchSwipeListener$.asObservable();
  }

  //toggle na przycisku info
  setProfileClosedToggleListener() {
    this.profileOpenClosedListener$.next(!this.profileOpenClosedListener$.value);
  }

  // true - otwarcie, false - zamknięcie
  setProfileClosedListener(data: boolean) {
    this.profileOpenClosedListener$.next(data);
  }

  getProfileClosedListener(): Observable<boolean> {
    return this.profileOpenClosedListener$.asObservable();
  }

  setImagesCount(value: number) {
    this.imagesCount$.next(value);
  }

  getImagesCount(): Observable<number> {
    return this.imagesCount$.asObservable();
  }
}
