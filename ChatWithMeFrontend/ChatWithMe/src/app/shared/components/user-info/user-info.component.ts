import { ComponentType } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HomeService, UserBasicData } from '@components/home/api/home.service';
import { ControllerService } from '@shared/services/controller.service';
import { Observable } from 'rxjs';
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

  constructor(
    private homeService: HomeService,
    private controllerService: ControllerService,
  ) { }

  ngOnInit(): void {
    this.userBasicData$ =
      this.controllerService.cachedUserInfo ?
        of(this.controllerService.cachedUserInfo) :
        this.homeService.getUserBasicData().pipe(tap((res) => this.controllerService.cachedUserInfo = res));
  }
}
