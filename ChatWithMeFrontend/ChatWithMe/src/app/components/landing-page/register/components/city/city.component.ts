import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InputComponent } from '@shared/components/input/input.component';
import { Observable, filter, tap } from 'rxjs';

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

  cities$: Observable<string[]>;

  postalCode: string;

  constructor(
    protected formGroupDirective: FormGroupDirective,
  ) { }

  ngOnInit(): void {
    this.formGroupDirective.form.get('postalCode').valueChanges.pipe(
      filter((res) => !!res),
      tap((res: string) => this.postalCode = res),
      tap((res) => console.log(res))
    ).subscribe();
  }
}


// sprawdzic czy dobrze sie formatuje kod pocztowy
// wpisuje kod pocztowy, jak jest git to idzie strzal po miejscowosci
//pozniej dodac kontrole przyciskow