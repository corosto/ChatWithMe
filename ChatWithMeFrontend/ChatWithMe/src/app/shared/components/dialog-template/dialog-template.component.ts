import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AdditionalDataComponent } from '@shared/components/additional-data/additional-data.component';

@Component({
  selector: 'dialog-template',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, AdditionalDataComponent],
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogTemplateComponent implements OnInit {

  form = this.fb.group({
    description: ['', [Validators.maxLength(500)]],
    zodiac: [null as string],
    education: [null as string],
    kids: [null as string],
    pets: [null as string],
    alcohol: [null as string],
    smoking: [null as string],
    gym: [null as string],
    diet: [null as string],
    school: [null as string],
    job: [null as string],
    position: [null as string],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) protected data: unknown,
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }
}
