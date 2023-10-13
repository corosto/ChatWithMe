import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LOOKING_FOR_OPTIONS, LookingForIcon, LookingForText } from '@components/landing-page/register/components/looking-for-dialog/constants/looking-for-options.const';

@Component({
  selector: 'looking-for-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './looking-for-box.component.html',
  styleUrls: ['./looking-for-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LookingForBoxComponent {
  @Input() set lookingFor(text: LookingForText) {
    this.text = text;
    this.icon = LOOKING_FOR_OPTIONS.find((res) => res.text === text).icon;
  }

  text: LookingForText;
  icon: LookingForIcon;
}
