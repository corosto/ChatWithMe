import { Injectable } from '@angular/core';
import { UserBasicData } from '@components/home/api/home.service';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { SideData } from '@components/settings/api/settings.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  //dane użytkownika przenoszone z rejestracji do input'ów w logowaniu
  private userAuthentication$ = new BehaviorSubject<UserAuthentication>(null);

  set userAuthentication(userAuthentication: UserAuthentication) {
    this.userAuthentication$.next(userAuthentication);
  }

  get userAuthentication(): UserAuthentication {
    return this.userAuthentication$.value;
  }
  ///////////////////////////////////////////////////////////////////


  //cache'owanie danych(zdjęcie, imię)
  private cachedUserBasicInfo$ = new BehaviorSubject<UserBasicData>(null);

  set cachedUserBasicInfo(cachedUserBasicInfo: UserBasicData) {
    this.cachedUserBasicInfo$.next(cachedUserBasicInfo);
  }

  get cachedUserBasicInfo(): UserBasicData {
    return this.cachedUserBasicInfo$.value;
  }
  ///////////////////////////////////////////////////////////////////


  //cache'owanie danych(cały user)
  private cachedUserMainInfo$ = new BehaviorSubject<Match>(null);

  set cachedUserMainInfo(cachedUserMainInfo: Match) {
    this.cachedUserMainInfo$.next(cachedUserMainInfo);
  }

  get cachedUserMainInfo(): Match {
    return this.cachedUserMainInfo$.value;
  }
  ///////////////////////////////////////////////////////////////////


  //cache'owanie danych(dane na lewym pasku oprócz header'a)
  private cachedUserSideInfo$ = new BehaviorSubject<SideData>(null);

  set cachedUserSideInfo(cachedUserSideInfo: SideData) {
    this.cachedUserSideInfo$.next(cachedUserSideInfo);
  }

  get cachedUserSideInfo(): SideData {
    return this.cachedUserSideInfo$.value;
  }

  getCachedUserSideInfoObservable(): Observable<SideData> {
    return this.cachedUserSideInfo$.asObservable();
  }
  ///////////////////////////////////////////////////////////////////


  //Listener do odświeżania zdjęcia(w header) po aktualizacji danych aktualnego użytkownika
  private refreshImage$ = new BehaviorSubject<void>(null);

  refreshImage(): void {
    this.refreshImage$.next();
  }

  refreshImageObservable(): Observable<void> {
    return this.refreshImage$.asObservable();
  }
  ///////////////////////////////////////////////////////////////////


  //Wyczyszczenie chatu(input'a) po zmianie na inny chat
  private clearChatInput$ = new BehaviorSubject<void>(null);

  setClearChat(): void {
    this.clearChatInput$.next();
  }

  getClearChatObservable(): Observable<void> {
    return this.clearChatInput$.asObservable();
  }
  ///////////////////////////////////////////////////////////////////


  //Jeżeli są dane to pokazuj się chat, ten subject posiada Id chatu i isSuperLiked
  private currentChatData$ = new BehaviorSubject<ChatData>(null);

  setCurrentChatData(value: ChatData): void {
    this.currentChatData$.next(value);
  }

  getCurrentChatDataObservable(): Observable<ChatData> {
    return this.currentChatData$.asObservable();
  }

  getCurrentChatDataRaw(): ChatData {
    return this.currentChatData$?.value;
  }
  ///////////////////////////////////////////////////////////////////


  //Ustawia aktualną lokalizację użytkownika(jeżeli wyraził zgodę)
  private userLocation$ = new BehaviorSubject<Location>(null);

  setUserLocation(value: Location): void {
    this.userLocation$.next(value);
  }

  getUserLocationRaw(): Location {
    return this.userLocation$.value;
  }
  ///////////////////////////////////////////////////////////////////


  //Zapisuje Id match'a który jest aktualnie widoczny
  private currentMatchId$ = new BehaviorSubject<number>(null);

  setCurrentMatchId(value: number): void {
    this.currentMatchId$.next(value);
  }

  getCurrentMatchIdRaw(): number {
    return this.currentMatchId$.value;
  }
  ///////////////////////////////////////////////////////////////////

}

interface UserAuthentication {
  email: string,
  password: string,
}

interface Location {
  currentWidth: number,
  currentHeight: number,
}

interface ChatData {
  chatId: number,
  withUserId: number,
  isSuperLiked: boolean,
}