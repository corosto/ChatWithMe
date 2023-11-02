using System.ComponentModel.DataAnnotations;

namespace ChatWithMe.Models.UserDtos
{
    public class UserMainUpdateDto
    {
        [Required(ErrorMessage = "Pole jest wymagane")]
        public int Height { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public int Weight { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public string Sex { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public string LookingFor { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public string[] Interests { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public string[] SexualOrientations { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public string[] Images { get; set; }

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
