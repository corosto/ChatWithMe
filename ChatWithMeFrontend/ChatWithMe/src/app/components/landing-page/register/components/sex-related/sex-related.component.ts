
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MyDatepickerComponent } from '@shared/components/my-datepicker/my-datepicker.component';
import { AddButtonWithDialogComponent } from '@shared/components/add-button-with-dialog/add-button-with-dialog.component';
import { LookingForDialogComponent } from '@components/landing-page/register/components/looking-for-dialog/looking-for-dialog.component';
import { SexualOrientationDialogComponent } from '../sexual-orientation-dialog/sexual-orientation-dialog.component';
import { InterestsDialogComponent } from '../interests-dialog/interests-dialog.component';

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
  LookingForDialogComponent = LookingForDialogComponent;
  SexualOrientationDialogComponent = SexualOrientationDialogComponent;
  InterestsDialogComponent = InterestsDialogComponent;
}
