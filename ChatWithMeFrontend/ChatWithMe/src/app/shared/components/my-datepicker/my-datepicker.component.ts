import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FULL_MONTH_FORMAT } from '@shared/components/my-datepicker/constants/my-datepicker.const';
import { format } from 'date-fns';

@Component({
  selector: 'my-datepicker',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: FULL_MONTH_FORMAT,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pl',
    },
  ],
  templateUrl: './my-datepicker.component.html',
  styleUrls: ['./my-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class MyDatepickerComponent {
  @Input() controlName: string;
  @Input() label: string;

  constructor(
    private formGroupDirective: FormGroupDirective,
  ) { }

  dateChange(date: MatDatepickerInputEvent<Date>): void {
    this.control.patchValue(format(new Date(date.value), 'dd.MM.yyyy'));
  }

  get control(): FormControl {
    return this.formGroupDirective.form.controls[this.controlName] as FormControl;
  }
}
