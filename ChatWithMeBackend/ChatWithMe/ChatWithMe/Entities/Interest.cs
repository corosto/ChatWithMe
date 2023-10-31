using System.Diagnostics.Metrics;

namespace ChatWithMe.Entities
{
    public class Interest
    {
        public int Id { get; set; }
        public string InterestName { get; set; }
        public List<UserInterests> Users { get; set; }
    }
}
