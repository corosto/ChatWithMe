import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeService } from '@components/home/api/home.service';
import { ContentComponent } from '@components/home/components/active-chat/components/content/content.component';
import { FooterComponent } from '@components/home/components/active-chat/components/footer/footer.component';
import { HeaderComponent } from '@components/home/components/active-chat/components/header/header.component';
import { Match } from '@components/home/components/matches/components/match/interfaces/match-interface';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { MatchService } from '@components/home/services/match.service';
import { MatchImageComponent } from '@shared/components/match-image/match-image.component';
import { MoreInfoComponent } from '@shared/components/more-info/more-info.component';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'active-chat',
  standalone: true,
  imports: [CommonModule, MatchImageComponent, MoreInfoComponent, MatButtonModule, MatIconModule, HeaderComponent, ContentComponent, FooterComponent],
  providers: [MatchesService, HomeService],
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveChatComponent implements OnInit {

  match$: Observable<Match>;

  constructor(
    private matchesService: MatchesService,
    private matchService: MatchService,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.match$ = this.matchService.getCurrentChatUserId().pipe(
      switchMap((res) => this.homeService.getUserChatInfo(res)),
      tap((res) => this.matchesService.setImagesCount(res?.images?.length)),
      tap(() => this.matchesService.forceSetCurrentImageIndex(0)),
    );
  }

  removeMatch(): void {
    console.log('usuwanie pary');
  }

  blockMatch(): void {
    console.log('banicja pary');
  }
}
