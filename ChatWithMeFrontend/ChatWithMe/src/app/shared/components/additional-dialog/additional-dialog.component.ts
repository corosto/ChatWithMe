import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ALCOHOL, DIET, EDUCATION, GYM, KIDS, PETS, SMOKING, ZODIAC_SIGNS } from '@shared/components/additional-dialog/constants/additional-dialog.const';
import { InputComponent } from '@shared/components/input/input.component';

@Component({
  selector: 'additional-dialog',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, InputComponent, MatIconModule],
  templateUrl: './additional-dialog.component.html',
  styleUrls: ['./additional-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AdditionalDialogComponent implements OnInit {

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
    work: [null as string],
    position: [null as string],
  });

  ZODIAC_SIGNS = ZODIAC_SIGNS;
  EDUCATION = EDUCATION;
  KIDS = KIDS;
  PETS = PETS;
  GYM = GYM;
  DIET = DIET;
  SMOKING = SMOKING;
  ALCOHOL = ALCOHOL;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) protected data: unknown,
  ) { }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }
}
