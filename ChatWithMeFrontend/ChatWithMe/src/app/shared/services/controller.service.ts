import { Injectable } from '@angular/core';
import { UserBasicData } from '@components/home/api/home.service';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { SideData } from '@components/settings/api/settings.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  private userAuthentication$ = new BehaviorSubject<UserAuthentication>(null);

  set userAuthentication(userAuthentication: UserAuthentication) {
    this.userAuthentication$.next(userAuthentication);
  }

  get userAuthentication(): UserAuthentication {
    return this.userAuthentication$.value;
  }



  private cachedUserBasicInfo$ = new BehaviorSubject<UserBasicData>(null);

  set cachedUserBasicInfo(cachedUserBasicInfo: UserBasicData) {
    this.cachedUserBasicInfo$.next(cachedUserBasicInfo);
  }

  get cachedUserBasicInfo(): UserBasicData {
    return this.cachedUserBasicInfo$.value;
  }



  private cachedUserMainInfo$ = new BehaviorSubject<Match>(null);

  set cachedUserMainInfo(cachedUserMainInfo: Match) {
    this.cachedUserMainInfo$.next(cachedUserMainInfo);
  }

  get cachedUserMainInfo(): Match {
    return this.cachedUserMainInfo$.value;
  }



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
}

export interface UserAuthentication {
  email: string,
  password: string,
}