import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NewConversationStream } from '@components/home/components/active-chat/components/content/interfaces/chat.interfaces';
import { UserService } from '@core/services/authorization/user.service';

@Component({
  selector: 'new-match-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './new-match-dialog.component.html',
  styleUrls: ['./new-match-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewMatchDialogComponent implements OnInit {

  conversationInfo: FixedNewConversationData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewConversationStream,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.conversationInfo =
      this.data.firstUserId.toString() === this.userService.userAuthorization().userId ?
        {
          userId: this.data.secondUserId,
          userName: this.data.secondUserName,
          userImage: this.data.secondUserImage,
          userSuperLiked: this.data.secondUserSuperLiked,
        }
        :
        {
          userId: this.data.firstUserId,
          userName: this.data.firstUserName,
          userImage: this.data.firstUserImage,
          userSuperLiked: this.data.firstUserSuperLiked,
        };
  }
}

interface FixedNewConversationData {
  userId: number,
  userName: string,
  userImage: string,
  userSuperLiked: boolean,
}