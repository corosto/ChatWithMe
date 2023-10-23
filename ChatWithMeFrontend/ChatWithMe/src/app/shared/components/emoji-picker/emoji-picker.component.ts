/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';

@Component({
  selector: 'emoji-picker',
  standalone: true,
  imports: [CommonModule, PickerComponent, MatIconModule, ClickOutsideDirective],
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ]
})
export class EmojiPickerComponent {

  opened = false;

  constructor(
    private formGroupDirective: FormGroupDirective,
  ) { }

  addEmoji(value: { emoji: any, event: PointerEvent }) {
    const messageForm = this.formGroupDirective.form.get('message');

    messageForm.patchValue(`${messageForm.value as string}${value.emoji.native}`);
  }
}
