namespace ChatWithMe.Models.UserDtos
{
    public class UserMainDto: UserMainUpdateDto
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public new List<string> Interests { get; set; }
        public new List<string> SexualOrientations { get; set; }
        public new List<string> Images { get; set; }
    }
}
