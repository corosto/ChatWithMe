import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshDataService {

  private imageRefreshListener$ = new BehaviorSubject<void>(null);

  refreshImage(): void {
    this.imageRefreshListener$.next();
  }

  refreshImageListener(): Observable<void> {
    return this.imageRefreshListener$.asObservable();
  }
}
