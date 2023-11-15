/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'image-dropdown',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './image-dropdown.component.html',
  styleUrls: ['./image-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDropdownComponent implements OnInit {

  @Input({ required: true }) origin: 'register' | 'settings';

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  previews$ = new BehaviorSubject<string[]>([]);

  constructor(
    private formGroupDirective: FormGroupDirective,
  ) { }

  ngOnInit(): void {
    const images = this.formGroupDirective.form.get('images');

    this.previews$.next((images?.value as string[]) || []);

    this.previews$.asObservable().pipe(
      filter((res) => !!res?.length),
    ).subscribe((res) => images.patchValue(res));
  }

  onFileSelected(event: any) {
    if (this.previews$.value?.length >= 6)
      return;

    const file = event.target.files as File[];

    this.handleImage(file[0]);

    this.fileInput.nativeElement.value = null;
  }

  move(index: number, side: number) {
    const itemToMove = this.previews$.value[index];
    const itemToSwapWith = this.previews$.value[index + side];

    this.previews$.value[index] = itemToSwapWith;
    this.previews$.value[index + side] = itemToMove;
  }

  deleteImage(index: number) {
    this.previews$.next(this.previews$.value.filter((_, i) => i !== index));
  }

  private handleImage(myFile: File) {
    if (myFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const bmp = e.target.result as string;
        this.previews$.next([...this.previews$.value, bmp]);
      };

      reader.readAsDataURL(myFile);
    }
  }

}
