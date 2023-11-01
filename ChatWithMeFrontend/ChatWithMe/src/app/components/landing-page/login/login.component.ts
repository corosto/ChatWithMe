import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '@components/landing-page/api/authentication.service';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { InputComponent } from '@shared/components/input/input.component';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@shared/patterns/valid.pattern';
import { ControllerService } from '@shared/services/controller.service';
import { Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, InputComponent, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  readonly RoutesPath = RoutesPath;
  readonly REGISTER_LINK = `/${RoutesPath.REGISTER}`;

  private onDestroy$ = new Subject<void>();

  form = this.fb.group({
    email: [null as string, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    password: [null as string, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
  });

  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private controllerService: ControllerService,
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.controllerService.userAuthentication);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  login() {
    this.authenticationService.login(this.form).pipe(
      filter((res) => !!res),
      tap(() => this.router.navigateByUrl(RoutesPath.HOME)),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }
}
