import { Injectable } from '@angular/core';
import { UserBasicData } from '@components/home/api/home.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  // private isRegisterFinished$ = new BehaviorSubject(false);
  // setIsRegisterFinished(isRegisterFinished: boolean) {
  //   this.isRegisterFinished$.next(isRegisterFinished);
  // }
  // getIsRegisterFinished(): Observable<boolean> {
  //   return this.isRegisterFinished$.asObservable();
  // }

  private userAuthentication$ = new BehaviorSubject<UserAuthentication>(null);
  
  set userAuthentication(userAuthentication: UserAuthentication) {
    this.userAuthentication$.next(userAuthentication);
  }
  
  get userAuthentication(): UserAuthentication {
    return this.userAuthentication$.value;
  }


  
  private cachedUserInfo$ = new BehaviorSubject<UserBasicData>(null);

  set cachedUserInfo(cachedUserInfo: UserBasicData) {
    this.cachedUserInfo$.next(cachedUserInfo);
  }

  get cachedUserInfo(): UserBasicData {
    return this.cachedUserInfo$.value;
  }
}

export interface UserAuthentication {
  email: string,
  password: string,
}