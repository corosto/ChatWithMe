namespace ChatWithMe.Entities
{
    public class Match
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int LikedId { get; set; }
        public LikeStatus Status { get; set; }
    }

    public enum LikeStatus
    {
        Dislike,
        SuperLike,
        Like,
        Blocked,
    }
}
