import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MessengerService } from '@components/home/components/active-chat/components/content/api/messenger.service';
import { MatchService } from '@components/home/services/match.service';
import { EmojiPickerComponent } from '@shared/components/emoji-picker/emoji-picker.component';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, EmojiPickerComponent, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  form = this.fb.group({
    message: ['', [Validators.required, Validators.maxLength(256)]],
  });

  constructor(
    private fb: FormBuilder,
    private messengerService: MessengerService,
    private matchService: MatchService,
  ) { }

  sendMessage(): void {
    this.messengerService.sendMessage(this.message.value as string, this.matchService.getCurrentChatIdRaw());
    this.message.reset();
  }

  get message(): AbstractControl {
    return this.form.get('message');
  }
}
