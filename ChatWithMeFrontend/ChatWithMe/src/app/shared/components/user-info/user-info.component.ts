import { ComponentType } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { HomeService, UserBasicData } from '@components/home/api/home.service';
import { RefreshDataService } from '@components/settings/services/refresh-data.service';
import { ControllerService } from '@shared/services/controller.service';
import { Observable, switchMap } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'user-info',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  providers: [HomeService],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent<T> implements OnInit {

  @Input({ required: true }) link: string;
  @Input({ required: true }) component: ComponentType<T>;

  userBasicData$: Observable<UserBasicData>;

  urlBefore: string;

  constructor(
    private homeService: HomeService,
    private controllerService: ControllerService,
    private refreshDataService: RefreshDataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userBasicData$ = this.refreshDataService.refreshImageListener().pipe(
      tap(() => {
        if (this.urlBefore === this.router.url)
          this.controllerService.cachedUserInfo = null;

        this.urlBefore = this.router.url;
      }),
      switchMap(() => this.controllerService.cachedUserInfo ? of(this.controllerService.cachedUserInfo) : this.homeService.getUserBasicData()),
      tap((res) => this.controllerService.cachedUserInfo = res)
    );
  }
}
