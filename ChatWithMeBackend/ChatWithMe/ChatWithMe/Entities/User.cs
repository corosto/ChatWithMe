using ChatWithMe.Models;
using System.Diagnostics.Metrics;

namespace ChatWithMe.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public DateTime BirthDate { get; set; }
        public string Sex { get; set; }
        public City City { get; set; }
        public string ShowMe { get; set; }
        public string LookingFor { get; set; }


        public List<UserInterests> Interests { get; set; } = new();
        public List<UserSexualOrientations> SexualOrientations { get; set; } = new();
        public List<Image> Images { get; set; } = new();


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
