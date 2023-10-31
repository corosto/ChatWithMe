using System.Diagnostics.Metrics;

namespace ChatWithMe.Entities
{
    public class UserInterests
    {
        public int InterestId { get; set; }
        public Interest Interest { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
