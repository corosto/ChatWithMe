
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LookingForDialogComponent } from '@components/landing-page/register/components/looking-for-dialog/looking-for-dialog.component';
import { AddButtonWithDialogComponent } from '@shared/components/add-button-with-dialog/add-button-with-dialog.component';
import { MyDatepickerComponent } from '@shared/components/my-datepicker/my-datepicker.component';
import { InterestsDialogComponent } from '../interests-dialog/interests-dialog.component';
import { SexualOrientationDialogComponent } from '../sexual-orientation-dialog/sexual-orientation-dialog.component';

@Component({
  selector: 'sex-related',
  standalone: true,
  imports: [CommonModule, MatChipsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatBadgeModule, MyDatepickerComponent, AddButtonWithDialogComponent],
  templateUrl: './sex-related.component.html',
  styleUrls: ['./sex-related.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class SexRelatedComponent {

  lookingFor = '';
  sexualOrientation = '';
  interests = '';

  LookingForDialogComponent = LookingForDialogComponent;
  SexualOrientationDialogComponent = SexualOrientationDialogComponent;
  InterestsDialogComponent = InterestsDialogComponent;

  constructor(
    private formGroupDirective: FormGroupDirective,
  ) { }

  valueChanged(controlName: string): void {
    switch (controlName) {
      case 'lookingFor':
        this.lookingFor = this.formGroupDirective.form.get(controlName).value as string;
        break;
      case 'sexualOrientation':
        this.sexualOrientation = this.formGroupDirective.form.get(controlName).value as string;
        break;
      case 'interests':
        this.interests = this.formGroupDirective.form.get(controlName).value as string;
        break;
    }
  }
}
