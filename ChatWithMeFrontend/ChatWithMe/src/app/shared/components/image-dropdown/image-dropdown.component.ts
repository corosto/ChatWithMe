/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  selectedImages: File[] = [];
  filesCounter = 0;

  previews$ = new BehaviorSubject<string[]>([]);

  constructor(
    private formGroupDirective: FormGroupDirective,
  ) { }

  ngOnInit(): void {
    const images = this.formGroupDirective.form.get('images');
    this.previews$.asObservable().pipe(filter((res) => !!res.length)).subscribe((res) => images.patchValue(res));
  }

  onFileSelected(event: any) {
    if (this.filesCounter >= 6)
      return;

    const files = event.target.files as File[];
    this.selectedImages = [...this.selectedImages, ...files];
    this.filesCounter = this.selectedImages.length;

    for (let i = 0; i < files.length; i++) {
      this.handleImages(i + 1);
    }

    this.fileInput.nativeElement.value = null;
  }

  move(index: number, side: number) {
    const itemToMove = this.previews$.value[index];
    const itemToSwapWith = this.previews$.value[index + side];

    this.previews$.value[index] = itemToSwapWith;
    this.previews$.value[index + side] = itemToMove;
  }

  deleteImage(index: number) {
    this.selectedImages = this.selectedImages.filter((file, i) => i !== index);
    this.previews$.next(this.previews$.value.filter((file, i) => i !== index));
    this.filesCounter = this.selectedImages.length;
  }

  private handleImages(imageIndex: number) {
    const myFile = this.selectedImages[this.selectedImages.length - imageIndex];// ! -1 nie działa xd

    if (myFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const url = e.target.result as string;
        this.previews$.next([...this.previews$.value, url]);
      };

      reader.readAsDataURL(myFile);
    }
  }

}
