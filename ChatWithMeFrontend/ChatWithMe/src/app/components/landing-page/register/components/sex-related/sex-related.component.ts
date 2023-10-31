
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { InterestsDialogComponent } from '@components/landing-page/register/components/interests-dialog/interests-dialog.component';
import { LookingForDialogComponent } from '@components/landing-page/register/components/looking-for-dialog/looking-for-dialog.component';
import { SexualOrientationDialogComponent } from '@components/landing-page/register/components/sexual-orientation-dialog/sexual-orientation-dialog.component';
import { AddButtonWithDialogComponent } from '@shared/components/add-button-with-dialog/add-button-with-dialog.component';
import { MyDatepickerComponent } from '@shared/components/my-datepicker/my-datepicker.component';

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
export class SexRelatedComponent implements OnInit {

  lookingFor = '';
  sexualOrientations = '';
  interests = '';

  LookingForDialogComponent = LookingForDialogComponent;
  SexualOrientationDialogComponent = SexualOrientationDialogComponent;
  InterestsDialogComponent = InterestsDialogComponent;

  constructor(
    private formGroupDirective: FormGroupDirective,
  ) { }

  ngOnInit(): void {
    this.lookingFor = this.formGroupDirective.form.get('lookingFor').value as string;
    this.sexualOrientations = this.formGroupDirective.form.get('sexualOrientations').value as string;
    this.interests = this.formGroupDirective.form.get('interests').value as string;
  }

  valueChanged(controlName: string): void {
    switch (controlName) {
      case 'lookingFor':
        this.lookingFor = this.formGroupDirective.form.get('lookingFor').value as string;
        break;
      case 'sexualOrientations':
        this.sexualOrientations = this.formGroupDirective.form.get('sexualOrientations').value as string;
        break;
      case 'interests':
        this.interests = this.formGroupDirective.form.get('interests').value as string;
        break;
    }
  }
}
