import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from '@components/landing-page/register/components/basic/basic.component';
import { MatChipsModule } from '@angular/material/chips';
import { SEX, SHOW_ME_SEX } from '@components/landing-page/register/components/sex-related/constants/sex.const';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'first-page',
  standalone: true,
  imports: [CommonModule, BasicComponent, MatChipsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class FirstPageComponent {

  @Output() changePage = new EventEmitter<number>();

  SEX = SEX;
  SHOW_ME_SEX = SHOW_ME_SEX;
}
