import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@components/landing-page/api/authentication.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserService } from '@core/services/authorization/user.service';
import { UserDataComponent } from '@components/user-data/user-data.component';
import { MatchesComponent } from '@components/matches/matches.component';

@Component({
  selector: 'pp-home',
  standalone: true,
  imports: [CommonModule, MatchesComponent, UserDataComponent],
  providers: [AuthenticationService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy {

  private onDestroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  logout(): void {
    this.authenticationService.logout().pipe(
      tap(() => this.userService.logout()),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }
}
