import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '@components/landing-page/api/authentication.service';
import { BasicComponent } from '@components/landing-page/register/components/basic/basic.component';
import { CityComponent } from '@components/landing-page/register/components/city/city.component';
import { SexRelatedComponent } from '@components/landing-page/register/components/sex-related/sex-related.component';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { ImageDropdownComponent } from '@shared/components/image-dropdown/image-dropdown.component';
import { InputComponent } from '@shared/components/input/input.component';
import { MyDatepickerComponent } from '@shared/components/my-datepicker/my-datepicker.component';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@shared/patterns/valid.pattern';
import { mustMatch } from '@shared/utils/must-match';
import { Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, InputComponent, SexRelatedComponent, MatAutocompleteModule, MatFormFieldModule,
    FormsModule, ReactiveFormsModule, RouterModule, MyDatepickerComponent, BasicComponent, ImageDropdownComponent, MatInputModule, CityComponent],
  providers: [AuthenticationService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    firstName: [null as string, [Validators.required]],
    email: [null as string, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    password: [null as string, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
    confirmedPassword: [null as string, [Validators.required]],

    height: [null as string, [Validators.required, Validators.min(110), Validators.max(240)]],
    weight: [null as string, [Validators.required, Validators.min(30), Validators.max(180)]],
    birthDate: [null as string, [Validators.required]],
    sex: [null as string, [Validators.required]],

    cityInput: [null as string, [Validators.required]],
    cityChosen: [null as string, [Validators.required]],

    showMe: [null as string, [Validators.required]],
    lookingFor: [null as string, [Validators.required]],

    images: [null as string[], [Validators.required, Validators.minLength(2)]],

    interests: [null as string[], [Validators.required, Validators.maxLength(5)]],
    sexualOrientation: [null as string[], [Validators.required, Validators.maxLength(3)]],
  },
    {
      updateOn: 'change',
      validators: mustMatch('password', 'confirmedPassword'),
    }
  );

  readonly LOGIN_LINK = `/${RoutesPath.LOGIN}`;

  private onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    protected authenticationService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => console.log(res));
  }

  register() {
    this.authenticationService.register(this.form).pipe(
      filter((res) => !!res),
      tap(() => this.router.navigateByUrl(RoutesPath.HOME)),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }
}