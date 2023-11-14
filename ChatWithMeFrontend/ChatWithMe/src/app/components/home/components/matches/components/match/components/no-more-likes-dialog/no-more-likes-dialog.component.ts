import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'no-more-likes-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './no-more-likes-dialog.component.html',
  styleUrls: ['./no-more-likes-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NoMoreLikesDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: 'Like' | 'SuperLike',
  ) { }
}
