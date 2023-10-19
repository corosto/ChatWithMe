import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { UserService } from '@core/services/authorization/user.service';
import { AuthenticationService } from '@components/landing-page/api/authentication.service';
import { tap } from 'rxjs/internal/operators/tap';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'user-settings',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthenticationService],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnDestroy {

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