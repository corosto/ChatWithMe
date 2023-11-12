using ChatWithMe.Models;

namespace ChatWithMe.Entities
{
    public class User
    {
        public User()
        {
            LikesLeft = 30;
            SuperLikesLeft = 2;
        }

        public int LikesLeft { get; set; }
        public int SuperLikesLeft { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public DateTimeOffset BirthDate { get; set; }
        public string Sex { get; set; }
        public City City { get; set; }
        public string ShowMe { get; set; }
        public string LookingFor { get; set; }


        public List<UserInterests> Interests { get; set; } = new();
        public List<UserSexualOrientations> SexualOrientations { get; set; } = new();
        public List<Image> Images { get; set; } = new();
        public List<Match> Match { get; set; } = new();
        public List<UserConversation> UserConversation { get; set; } = new();
        public string? ConnectionId { get; set; }
        public int? CurrentConversationId { get; set; }


        public int LookingForAgeMin { get; set; }
        public int LookingForAgeMax { get; set; }
        public int LookingForDistanceMax { get; set; }
        public bool UseAgeFilter { get; set; }
        public bool UseDistanceFilter { get; set; }


        public string? Description { get; set; }
        public string? Zodiac { get; set; }
        public string? Education { get; set; }
        public string? Kids { get; set; }
        public string? Pets { get; set; }
        public string? Alcohol { get; set; }
        public string? Smoking { get; set; }
        public string? Gym { get; set; }
        public string? Diet { get; set; }
        public string? School { get; set; }
        public string? Job { get; set; }
        public string? Position { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }
    }
}
