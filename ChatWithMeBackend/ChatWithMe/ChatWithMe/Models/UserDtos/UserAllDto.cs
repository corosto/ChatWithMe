namespace ChatWithMe.Models.UserDtos
{
    public class UserAllDto
    {
        public string Name { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
        public string LookingFor { get; set; }
        public City City { get; set; }


        public List<string> Interests { get; set; }
        public List<string> SexualOrientations { get; set; }
        public List<string> Images { get; set; }


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
    }
}
