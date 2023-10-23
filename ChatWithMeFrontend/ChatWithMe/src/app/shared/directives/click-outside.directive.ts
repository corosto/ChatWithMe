import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { Subject, filter, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {

  @Output() clickOutside = new EventEmitter<void>();

  private onDestroy$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.document, 'click')
      .pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement);
        }),
        takeUntil(this.onDestroy$),
      ).subscribe(() => {
        this.clickOutside.emit();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck));
  }
}