import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { SEXUAL_ORIENTATIONS_OPTIONS } from '@components/landing-page/register/components/sexual-orientation-dialog/constants/sexual-orientation-options.const';

@Component({
  selector: 'sexual-orientation-dialog',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './sexual-orientation-dialog.component.html',
  styleUrls: ['./sexual-orientation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SexualOrientationDialogComponent implements OnInit {

  SEXUAL_ORIENTATIONS_OPTIONS = SEXUAL_ORIENTATIONS_OPTIONS;

  constructor(
    public dialogRef: MatDialogRef<SexualOrientationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[],
  ) { }

  ngOnInit(): void {
    this.SEXUAL_ORIENTATIONS_OPTIONS.forEach((option) => {
      const matching = this.data?.find((res) => res === option.value);

      if (matching)
        option.isChecked = true;
    });
  }

  close(): void {
    const filtered = this.SEXUAL_ORIENTATIONS_OPTIONS.filter((res) => !!res.isChecked);
    this.dialogRef.close(filtered.map((res) => res.value));
  }
}
