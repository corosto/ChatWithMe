import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeService } from '@components/home/api/home.service';
import { ContentComponent } from '@components/home/components/active-chat/components/content/content.component';
import { FooterComponent } from '@components/home/components/active-chat/components/footer/footer.component';
import { HeaderComponent } from '@components/home/components/active-chat/components/header/header.component';
import { MatchesApiService } from '@components/home/components/matches/api/matches-api.service';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { MatchImageComponent } from '@shared/components/match-image/match-image.component';
import { MoreInfoComponent } from '@shared/components/more-info/more-info.component';
import { ControllerService } from '@shared/services/controller.service';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'active-chat',
  standalone: true,
  imports: [CommonModule, MatchImageComponent, MoreInfoComponent, MatButtonModule, MatIconModule, HeaderComponent, ContentComponent, FooterComponent],
  providers: [MatchesService, HomeService, MatchesApiService],
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveChatComponent implements OnInit {

  match$: Observable<Match>;

  isSuperLiked: boolean;
  matchName: string;

  constructor(
    private matchesService: MatchesService,
    private homeService: HomeService,
    private matchesApiService: MatchesApiService,
    private controllerService: ControllerService,
  ) { }

  ngOnInit(): void {
    this.match$ = this.controllerService.getCurrentChatDataObservable().pipe(
      switchMap((res) => this.homeService.getUserChatInfo(res.withUserId)),
      tap((res) => this.matchName = res.name),
      tap((res) => this.matchesService.setImagesCount(res?.images?.length)),
      tap(() => this.matchesService.forceSetCurrentImageIndex(0)),
      tap(() => this.controllerService.setClearChat())
    );
  }

  removeMatch(id: number): void {
    this.matchesApiService.unmatchUser(id).subscribe();
  }

  blockMatch(id: number): void {
    this.matchesApiService.blockUser(id).subscribe();
  }
}
