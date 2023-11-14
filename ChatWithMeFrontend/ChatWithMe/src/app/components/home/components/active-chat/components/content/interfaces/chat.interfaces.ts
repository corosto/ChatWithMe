export interface MessageStream {
  chatId: number,
  authorId: number,
  authorName: string,
  date: Date,
  content: string,
  fromCurrentUser: boolean,
}

export interface ChatsStream {
  id: number, //id chatu
  withUser: string,
  withUserId: number,
  userImage: string,
  isSuperLiked: boolean,
  date: Date,
  content: string
  isRead: boolean,
}

export interface NewConversationStream {
  firstUserId: number,
  firstUserName: string,
  firstUserImage: string,
  firstUserSuperLiked: boolean,

  secondUserId: number,
  secondUserName: string,
  secondUserImage: string,
  secondUserSuperLiked: boolean,
}
