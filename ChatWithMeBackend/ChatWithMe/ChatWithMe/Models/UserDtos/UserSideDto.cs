namespace ChatWithMe.Models.UserDtos
{
    public class UserSideDto
    {
        public string Email { get; set; }
        public string ShowMe { get; set; }
        public int LookingForAgeMin { get; set; }
        public int LookingForAgeMax { get; set; }
        public int LookingForDistanceMax { get; set; }
        public bool UseAgeFilter { get; set; }
        public bool UseDistanceFilter { get; set; }
        public City City { get; set; }
    }
}
