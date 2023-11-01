using System.Diagnostics.Metrics;

namespace ChatWithMe.Entities
{
    public class SexualOrientation
    {
        public int Id { get; set; }
        public string SexualOrientationName { get; set; }
        public List<UserSexualOrientations> Users { get; set; } = new();
    }
}
