using System.Diagnostics.Metrics;

namespace ChatWithMe.Entities
{
    public class UserSexualOrientations
    {
        public int SexualOrientationId { get; set; }
        public SexualOrientation SexualOrientation { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
