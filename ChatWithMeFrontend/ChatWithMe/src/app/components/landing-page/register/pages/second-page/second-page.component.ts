import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ControlContainer, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { ImageDropdownComponent } from '@shared/components/image-dropdown/image-dropdown.component';
import { SexRelatedComponent } from '@components/landing-page/register/components/sex-related/sex-related.component';

@Component({
  selector: 'second-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, ImageDropdownComponent, SexRelatedComponent],
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class SecondPageComponent {

  @Output() changePage = new EventEmitter<number>();

}
