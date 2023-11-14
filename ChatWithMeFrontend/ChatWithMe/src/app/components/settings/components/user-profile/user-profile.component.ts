
import { ComponentType, NoopScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { InterestsDialogComponent } from '@components/landing-page/register/components/interests-dialog/interests-dialog.component';
import { LookingForDialogComponent } from '@components/landing-page/register/components/looking-for-dialog/looking-for-dialog.component';
import { SEX } from '@components/landing-page/register/components/sex-related/constants/sex.const';
import { SexualOrientationDialogComponent } from '@components/landing-page/register/components/sexual-orientation-dialog/sexual-orientation-dialog.component';
import { MainData, SettingsService } from '@components/settings/api/settings.service';
import { RefreshDataService } from '@components/settings/services/refresh-data.service';
import { DialogTemplateComponent } from '@shared/components/dialog-template/dialog-template.component';
import { ImageDropdownComponent } from '@shared/components/image-dropdown/image-dropdown.component';
import { InputComponent } from '@shared/components/input/input.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { MatchImageComponent } from '@shared/components/match-image/match-image.component';
import { MoreInfoComponent } from '@shared/components/more-info/more-info.component';
import { SpaceArrayPipe } from '@shared/pipes/space-array.pipe';
import { ControllerService } from '@shared/services/controller.service';
import { BehaviorSubject, Observable, map, of, shareReplay, switchMap } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { filter } from 'rxjs/internal/operators/filter';
import { finalize } from 'rxjs/internal/operators/finalize';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [CommonModule, MatSelectModule, LoadingComponent, MatIconModule, SpaceArrayPipe, MatchImageComponent, MoreInfoComponent, MatButtonModule, ImageDropdownComponent, ReactiveFormsModule, MatDialogModule, InputComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent<T> implements OnInit, OnDestroy {

  SEX = SEX;

  LookingForDialogComponent = LookingForDialogComponent;
  SexualOrientationDialogComponent = SexualOrientationDialogComponent;
  InterestsDialogComponent = InterestsDialogComponent;

  form = this.fb.group({
    height: [null as string, [Validators.required, Validators.min(110), Validators.max(240)]],
    weight: [null as string, [Validators.required, Validators.min(30), Validators.max(180)]],
    sex: [null as string, [Validators.required]],

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

    lookingFor: [null as string, [Validators.required]],

    images: [null as string[], [Validators.required, Validators.minLength(2)]],

    interests: [null as string[], [Validators.required, Validators.maxLength(5)]],
    sexualOrientations: [null as string[], [Validators.required, Validators.maxLength(3)]],
  });

  userProfileData$: Observable<Match>;
  reloadDataListener$ = new BehaviorSubject<void>(null);
  inEdit$ = new BehaviorSubject<boolean>(false);

  private onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private matchesService: MatchesService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private settingsService: SettingsService,
    private refreshDataService: RefreshDataService,
    private controllerService: ControllerService,
  ) { }

  ngOnInit(): void {
    this.userProfileData$ = this.reloadDataListener$.asObservable().pipe(
      switchMap(() => this.controllerService.cachedUserMainInfo ? of(this.controllerService.cachedUserMainInfo) : this.settingsService.getUserMainData()),
      shareReplay(1),
      map((res) => ({
        ...res,
        description: res.description ?? '',
      } as Match)),
      tap((res) => {
        this.form.patchValue(res);
        this.matchesService.setImagesCount(res.images.length);
        this.controllerService.cachedUserMainInfo = res;
      }),
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openAdditionalDialog(): void {
    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      data: this.form.value,
      panelClass: ['changeDialogScrollView', 'move-dialog'],
      width: '375px',
      maxHeight: '640px',
      disableClose: true,
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy(),
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
      tap((res) => this.form.patchValue(res as unknown)),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  openDialog(dialog: 'lookingFor' | 'sexualOrientations' | 'interests'): void {
    let component: unknown;
    let height: string;
    let currentForm: AbstractControl;

    switch (dialog) {
      case 'lookingFor':
        component = LookingForDialogComponent;
        height = '400px';
        currentForm = this.form.get('lookingFor');
        break;
      case 'sexualOrientations':
        component = SexualOrientationDialogComponent;
        height = '570px';
        currentForm = this.form.get('sexualOrientations');
        break;
      case 'interests':
        component = InterestsDialogComponent;
        height = '450px';
        currentForm = this.form.get('interests');
        break;
    }

    const dialogRef = this.dialog.open(component as ComponentType<T>, {
      data: currentForm.value as string | string[],
      panelClass: 'changeDialogScrollView',
      width: '460px',
      height: height,
      autoFocus: false,
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy(),
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
      tap((res) => currentForm.patchValue(res as unknown)),
      finalize(() => this.cd.markForCheck()),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  saveForm(): void {
    this.settingsService.updateUserMainData(this.form.value as MainData).pipe(
      filter((res) => !!res),
    ).subscribe(() => {
      this.inEdit$.next(false);
      this.matchesService.forceSetCurrentImageIndex(0);
      this.refreshDataService.refreshImage();
      this.controllerService.cachedUserMainInfo = null;
      this.reloadDataListener$.next();
    });
  }
}
