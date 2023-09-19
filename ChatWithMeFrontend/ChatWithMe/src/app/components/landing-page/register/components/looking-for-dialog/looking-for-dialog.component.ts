import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LOOKING_FOR_OPTIONS } from '@components/landing-page/register/components/looking-for-dialog/constants/looking-for-options.const';
import { SafePipe } from '@shared/pipes/safe.pipe';

@Component({
  selector: 'looking-for-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SafePipe],
  templateUrl: './looking-for-dialog.component.html',
  styleUrls: ['./looking-for-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LookingForDialogComponent {

  LOOKING_FOR_OPTIONS = LOOKING_FOR_OPTIONS;

  chosenOption: string = this.data;

  constructor(
    public dialogRef: MatDialogRef<LookingForDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  setOption(option: string): void {
    this.chosenOption = option;
  }
}
