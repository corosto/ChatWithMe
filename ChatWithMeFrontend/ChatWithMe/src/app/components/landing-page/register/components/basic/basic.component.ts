import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '@shared/components/input/input.component';

@Component({
  selector: 'basic',
  standalone: true,
  imports: [CommonModule, MatIconModule, InputComponent],
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {

  passwordVisibility = {
    password: false,
    confirmedPassword: false,
  };

  togglePasswordVisibility(inputName: 'password' | 'confirmedPassword') {
    this.passwordVisibility[inputName] = !this.passwordVisibility[inputName];
  }
}
