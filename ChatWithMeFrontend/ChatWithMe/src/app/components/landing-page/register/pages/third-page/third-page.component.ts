import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AdditionalDataComponent } from '@shared/components/additional-data/additional-data.component';

@Component({
  selector: 'third-page',
  standalone: true,
  imports: [CommonModule, AdditionalDataComponent, MatButtonModule],
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class ThirdPageComponent {

  @Output() changePage = new EventEmitter<number>();

  constructor(
    protected formGroupDirective: FormGroupDirective,
  ) { }
}
