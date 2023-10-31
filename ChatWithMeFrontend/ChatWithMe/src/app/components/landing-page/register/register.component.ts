import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '@components/landing-page/api/authentication.service';
import { Register } from '@components/landing-page/interfaces/authentication-interface';
import { BasicComponent } from '@components/landing-page/register/components/basic/basic.component';
import { FirstPageComponent } from '@components/landing-page/register/pages/first-page/first-page.component';
import { SecondPageComponent } from '@components/landing-page/register/pages/second-page/second-page.component';
import { ThirdPageComponent } from '@components/landing-page/register/pages/third-page/third-page.component';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { City } from '@shared/components/city/city.component';
import { InputComponent } from '@shared/components/input/input.component';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@shared/patterns/valid.pattern';
import { mustMatch } from '@shared/utils/must-match';
import { BehaviorSubject, Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, MatButtonModule, InputComponent, ReactiveFormsModule, RouterModule, BasicComponent, FirstPageComponent, SecondPageComponent, ThirdPageComponent],
  providers: [AuthenticationService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  form = this.fb.group({
    name: [null as string, [Validators.required]],
    email: [null as string, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    password: [null as string, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
    confirmedPassword: [null as string, [Validators.required]],

    height: [null as string, [Validators.required, Validators.min(110), Validators.max(240)]],
    weight: [null as string, [Validators.required, Validators.min(30), Validators.max(180)]],
    birthDate: [null as string, [Validators.required]],
    sex: [null as string, [Validators.required]],

    description: ['', [Validators.maxLength(500)]],
    zodiac: [null as string],
    education: [null as string],
    kids: [null as string],
    pets: [null as string],
    alcohol: [null as string],
    smoking: [null as string],
    gym: [null as string],
    diet: [null as string],
    school: [null as string],
    job: [null as string],
    position: [null as string],

    cityInput: [null as string, [Validators.required]],
    cityChosen: [null as City, [Validators.required]],

    showMe: [null as string, [Validators.required]],
    lookingFor: [null as string, [Validators.required]],

    images: [null as string[], [Validators.required, Validators.minLength(2)]],
    imagesToSend: [null as File[], [Validators.required, Validators.minLength(2)]],

    interests: [null as string[], [Validators.required, Validators.maxLength(5)]],
    sexualOrientations: [null as string[], [Validators.required, Validators.maxLength(3)]],
  },
    {
      updateOn: 'change',
      validators: mustMatch('password', 'confirmedPassword'),
    }
  );

  readonly LOGIN_LINK = `/${RoutesPath.LOGIN}`;

  currentPageListener$ = new BehaviorSubject<number>(1);

  private onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    protected authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      // console.log(this.form.get('images').value)
      // console.log(this.form.get('imagesToSend').value)
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  register() {
    this.authenticationService.register(this.form.value as Register).pipe(
      filter((res) => !!res),
      tap(() => this.router.navigateByUrl(RoutesPath.HOME)),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  changePage(pageSide: number): void {
    this.currentPageListener$.next(this.currentPageListener$.value + pageSide);
  }
}