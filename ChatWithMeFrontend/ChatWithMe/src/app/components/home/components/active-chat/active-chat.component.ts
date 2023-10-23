import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContentComponent } from '@components/home/components/active-chat/components/content/content.component';
import { FooterComponent } from '@components/home/components/active-chat/components/footer/footer.component';
import { HeaderComponent } from '@components/home/components/active-chat/components/header/header.component';
import { MOCKS } from '@components/home/components/matches/components/match/mock/mock';
import { MatchesService } from '@components/home/components/matches/service/matches.service';
import { MatchImageComponent } from '@shared/components/match-image/match-image.component';
import { MoreInfoComponent } from '@shared/components/more-info/more-info.component';

@Component({
  selector: 'active-chat',
  standalone: true,
  imports: [CommonModule, MatchImageComponent, MoreInfoComponent, MatButtonModule, MatIconModule, HeaderComponent, ContentComponent, FooterComponent],
  providers: [MatchesService],
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveChatComponent implements OnInit {

  match = MOCKS[4];

  constructor(
    private matchesService: MatchesService,
  ) { }

  ngOnInit(): void {
    this.matchesService.setImagesCount(this.match.images.length);
  }

  removeMatch(): void {
    console.log('usuwanie pary');
  }
}
