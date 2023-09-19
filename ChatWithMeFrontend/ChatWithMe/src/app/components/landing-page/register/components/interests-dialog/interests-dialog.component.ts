import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { INTERESTS } from './constants/interests.const';

@Component({
  selector: 'interests-dialog',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatButtonModule],
  templateUrl: './interests-dialog.component.html',
  styleUrls: ['./interests-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InterestsDialogComponent {

  INTERESTS = INTERESTS;

  chosenInterests: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<InterestsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[],
  ) { }
}
