import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationService } from '@components/landing-page/api/authentication.service';
import { InputComponent } from '@shared/components/input/input.component';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'city',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule,
    MatSelectModule, MatAutocompleteModule, MatInputModule, InputComponent, ReactiveFormsModule],
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class CityComponent implements OnInit {

  cities$: Observable<{ text: string, value: City }[]>;

  constructor(
    protected formGroupDirective: FormGroupDirective,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.cities$ = this.cityInput.valueChanges.pipe(
      tap(() => this.cityChosen?.value ? this.cityInput.setErrors(null) : this.cityInput.setErrors({ error: true })),
      filter((res) => !!res),
      debounceTime(450),
      switchMap((res: string) => this.authenticationService.getCities(res)),
    );
  }

  save(data: City) {
    this.cityChosen.patchValue(data);
  }

  get cityInput(): AbstractControl {
    return this.formGroupDirective.form.get('cityInput');
  }

  get cityChosen(): AbstractControl {
    return this.formGroupDirective.form.get('cityChosen');
  }
}

export interface City {
  Name: string,
  Height: number,
  Width: number,
}
