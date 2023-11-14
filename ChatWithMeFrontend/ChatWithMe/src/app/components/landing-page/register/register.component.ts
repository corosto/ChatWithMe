import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService, USER_0, USER_1, USER_10, USER_11, USER_12, USER_13, USER_2, USER_3, USER_4, USER_5, USER_6, USER_7, USER_8, USER_9 } from '@components/landing-page/api/authentication.service';
import { Register } from '@components/landing-page/interfaces/authentication-interface';
import { BasicComponent } from '@components/landing-page/register/components/basic/basic.component';
import { FirstPageComponent } from '@components/landing-page/register/pages/first-page/first-page.component';
import { SecondPageComponent } from '@components/landing-page/register/pages/second-page/second-page.component';
import { ThirdPageComponent } from '@components/landing-page/register/pages/third-page/third-page.component';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { City } from '@shared/components/city/city.component';
import { InputComponent } from '@shared/components/input/input.component';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@shared/patterns/valid.pattern';
import { ControllerService } from '@shared/services/controller.service';
import { mustMatch } from '@shared/utils/must-match';
import { BehaviorSubject, Subject, debounceTime, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, MatButtonModule, InputComponent, ReactiveFormsModule, RouterModule, BasicComponent, FirstPageComponent, SecondPageComponent, ThirdPageComponent],
  providers: [AuthenticationService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {

  form = this.fb.group({
    name: [null as string, [Validators.required]],
    email: [null as string, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    password: [null as string, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
    confirmedPassword: [null as string, [Validators.required]],

    height: [null as string, [Validators.required, Validators.min(110), Validators.max(240)]],
    weight: [null as string, [Validators.required, Validators.min(30), Validators.max(180)]],
    birthDate: [null as Date, [Validators.required]],
    sex: [null as string, [Validators.required]],

    description: ['', [Validators.maxLength(500)]],
    zodiac: [''],
    education: [''],
    kids: [''],
    pets: [''],
    alcohol: [''],
    smoking: [''],
    gym: [''],
    diet: [''],
    school: [''],
    job: [''],
    position: [''],

    cityInput: [null as string, [Validators.required]],
    cityChosen: [null as City, [Validators.required]],

    showMe: [null as string, [Validators.required]],
    lookingFor: [null as string, [Validators.required]],

    images: [null as string[], [Validators.required, Validators.minLength(2)]],

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
    private controllerService: ControllerService,
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  register(): void {
    this.authenticationService.register(this.form.value as Register).pipe(
      filter((res) => !!res),
      tap(() => this.controllerService.userAuthentication = { email: this.form.value.email, password: this.form.value.password }),
      tap(() => this.router.navigateByUrl(RoutesPath.LOGIN)),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  changePage(pageSide: number): void {
    this.currentPageListener$.next(this.currentPageListener$.value + pageSide);
  }

  previews$ = new BehaviorSubject<string[]>([]);

  registerMock(): void {
    const bmp$ = new BehaviorSubject<string[]>([]);

    const subject = new BehaviorSubject<void>(null);

    subject.asObservable().pipe(
      tap(() => {
        USER_0.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user0: Register = {
                ...USER_0,
                images: bmp$.value,
              };

              if (USER_0.images.length === index + 1)
                this.authenticationService.register(user0).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_1.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user1: Register = {
                ...USER_1,
                images: bmp$.value,
              };

              if (USER_1.images.length === index + 1)
                this.authenticationService.register(user1).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_2.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user2: Register = {
                ...USER_2,
                images: bmp$.value,
              };

              if (USER_2.images.length === index + 1)
                this.authenticationService.register(user2).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_3.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user3: Register = {
                ...USER_3,
                images: bmp$.value,
              };

              if (USER_3.images.length === index + 1)
                this.authenticationService.register(user3).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_4.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user4: Register = {
                ...USER_4,
                images: bmp$.value,
              };

              if (USER_4.images.length === index + 1)
                this.authenticationService.register(user4).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_5.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user5: Register = {
                ...USER_5,
                images: bmp$.value,
              };

              if (USER_5.images.length === index + 1)
                this.authenticationService.register(user5).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_6.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user6: Register = {
                ...USER_6,
                images: bmp$.value,
              };

              if (USER_6.images.length === index + 1)
                this.authenticationService.register(user6).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_7.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user7: Register = {
                ...USER_7,
                images: bmp$.value,
              };

              if (USER_7.images.length === index + 1)
                this.authenticationService.register(user7).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_8.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user8: Register = {
                ...USER_8,
                images: bmp$.value,
              };

              if (USER_8.images.length === index + 1)
                this.authenticationService.register(user8).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_9.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user9: Register = {
                ...USER_9,
                images: bmp$.value,
              };

              if (USER_9.images.length === index + 1)
                this.authenticationService.register(user9).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_10.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user10: Register = {
                ...USER_10,
                images: bmp$.value,
              };

              if (USER_10.images.length === index + 1)
                this.authenticationService.register(user10).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_11.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user11: Register = {
                ...USER_11,
                images: bmp$.value,
              };

              if (USER_11.images.length === index + 1)
                this.authenticationService.register(user11).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_12.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user12: Register = {
                ...USER_12,
                images: bmp$.value,
              };

              if (USER_12.images.length === index + 1)
                this.authenticationService.register(user12).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
      debounceTime(2000),
      tap(() => {
        USER_13.images.forEach((image, index) => {
          const request = new XMLHttpRequest();
          request.open('GET', image, true);
          request.responseType = 'blob';
          request.onload = () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const bmp = e.target.result as string;
              bmp$.next([...bmp$.value, bmp]);

              const user13: Register = {
                ...USER_13,
                images: bmp$.value,
              };

              if (USER_13.images.length === index + 1)
                this.authenticationService.register(user13).subscribe();
            };
            reader.readAsDataURL(request.response);
          };
          request.send();
        });
        bmp$.next([]);
      }),
    ).subscribe();
  }
}