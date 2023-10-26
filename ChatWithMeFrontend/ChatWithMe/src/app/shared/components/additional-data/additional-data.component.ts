import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ALCOHOL, DIET, EDUCATION, GYM, KIDS, PETS, SMOKING, ZODIAC_SIGNS } from '@shared/components/additional-data/constants/additional-data.const';
import { InputComponent } from '@shared/components/input/input.component';

@Component({
  selector: 'additional-data',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatButtonModule, FormsModule, ReactiveFormsModule, InputComponent, MatIconModule],
  templateUrl: './additional-data.component.html',
  styleUrls: ['./additional-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class AdditionalDataComponent {

  @Input() inSettings = false;

  ZODIAC_SIGNS = ZODIAC_SIGNS;
  EDUCATION = EDUCATION;
  KIDS = KIDS;
  PETS = PETS;
  GYM = GYM;
  DIET = DIET;
  SMOKING = SMOKING;
  ALCOHOL = ALCOHOL;

  constructor(
    protected formGroupDirective: FormGroupDirective
  ) { }
}
