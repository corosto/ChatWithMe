import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MatchesService {

  private imageSwipeListener$ = new BehaviorSubject<number>(0);
  private matchSwipeListener$ = new BehaviorSubject<boolean>(false);
  private profileOpenClosedListener$ = new BehaviorSubject<boolean>(false);
  private imagesCount$ = new BehaviorSubject<number>(null);


  // 1 - następne zdjęcie, -1 poprzednie zdjęcie
  setImageSwipeListener(data: number) {
    const value = this.imageSwipeListener$.value + data;

    if (value < this.imagesCount$.value)
      this.imageSwipeListener$.next(value);
  }

  getImageSwipeListener(): Observable<number> {
    return this.imageSwipeListener$.asObservable();
  }

  // true - like, false - dislike
  setMatchSwipeListener(data: boolean) {
    this.imageSwipeListener$.next(0);
    this.matchSwipeListener$.next(data);
  }

  getMatchSwipeListener(): Observable<boolean> {
    return this.matchSwipeListener$.asObservable();
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
