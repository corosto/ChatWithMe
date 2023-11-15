import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MessengerService } from '@components/home/components/active-chat/components/content/api/messenger.service';
import { EmojiPickerComponent } from '@shared/components/emoji-picker/emoji-picker.component';
import { ControllerService } from '@shared/services/controller.service';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, EmojiPickerComponent, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  form = this.fb.group({
    message: ['', [Validators.required, Validators.maxLength(256)]],
  });

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private messengerService: MessengerService,
    private controllerService: ControllerService,
  ) { }

  ngOnInit(): void {
    this.controllerService.getClearChatObservable().pipe(
      tap(() => this.message.reset()),
      tap(() => this.cd.markForCheck()),
    ).subscribe();
  }

  sendMessage(): void {
    this.messengerService.sendMessage(this.message.value as string, this.controllerService.getCurrentChatDataRaw().chatId);
    this.message.reset();
  }

  get message(): AbstractControl {
    return this.form.get('message');
  }
}
