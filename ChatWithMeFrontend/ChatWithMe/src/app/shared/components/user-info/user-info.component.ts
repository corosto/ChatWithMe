import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentType } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'user-info',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent<T> {

  @Input({ required: true }) link: string;
  @Input({ required: true }) component: ComponentType<T>;

}
