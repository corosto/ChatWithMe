import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { AuthenticationService } from '@components/landing-page/api/authentication.service';
import { SHOW_ME_SEX } from '@components/landing-page/register/components/sex-related/constants/sex.const';
import { USER_DATA_MOCK } from '@components/settings/interfaces/user-data.interface';
import { UserService } from '@core/services/authorization/user.service';
import { CityComponent, City } from '@shared/components/city/city.component';
import { InputComponent } from '@shared/components/input/input.component';
import { debounceTime } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'user-settings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSliderModule, MatSlideToggleModule, InputComponent, ReactiveFormsModule, CityComponent, MatSelectModule],
  providers: [AuthenticationService],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit, OnDestroy {

  SHOW_ME_SEX = SHOW_ME_SEX;

  form = this.fb.group({
    email: [null as string],
    showMe: [null as string, [Validators.required]],
    lookingForAgeMin: [null as number, [Validators.required]],
    lookingForAgeMax: [null as number, [Validators.required]],
    lookingForDistanceMax: [null as number, [Validators.required]],
    useAgeFilter: [null as boolean, [Validators.required]],
    useDistanceFilter: [null as boolean, [Validators.required]],
    cityInput: [null as string, [Validators.required]],
    cityChosen: [null as City, [Validators.required]],
  });

  private onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.form.patchValue(USER_DATA_MOCK);

    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(() => {
      //TODO strzał do api z formularzem i refresh danych uzytkownika
    });
  }

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