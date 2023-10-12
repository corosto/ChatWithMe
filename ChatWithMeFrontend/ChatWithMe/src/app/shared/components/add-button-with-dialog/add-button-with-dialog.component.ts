import { ComponentType, NoopScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'add-button-with-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-button-with-dialog.component.html',
  styleUrls: ['./add-button-with-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddButtonWithDialogComponent<T> implements OnDestroy {

  @Input({ required: true }) formName: string;
  @Input({ required: true }) title: string;
  @Input({ required: true }) buttonText: string;
  @Input({ required: true }) set value(dataString: string | string[]) {
    this.valueDisplay = Array.isArray(dataString) ? dataString.join(', ') : dataString;
  }
  @Input() dialogHeight = '400px';
  @Input({ required: true }) component: ComponentType<T>;

  @Output() valueChanged = new EventEmitter();

  valueDisplay: string;

  private onDestroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private formGroupDirective: FormGroupDirective,
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openDialog(): void {
    const formValue = this.formGroupDirective.form.get(this.formName);

    const dialogRef = this.dialog.open(this.component, {
      data: formValue.value as string | string[],
      panelClass: 'changeDialogScrollView',
      width: '460px',
      height: this.dialogHeight,
      autoFocus: false,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy(),
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
      tap((res) => formValue.patchValue(res as string | string[])),
      tap(() => this.valueChanged.emit()),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }
}
