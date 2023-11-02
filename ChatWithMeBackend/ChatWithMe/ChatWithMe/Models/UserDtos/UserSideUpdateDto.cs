using System.ComponentModel.DataAnnotations;

namespace ChatWithMe.Models.UserDtos
{
    public class UserSideUpdateDto
    {
        [Required(ErrorMessage = "Pole jest wymagane")]
        public string ShowMe { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public int LookingForAgeMin { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public int LookingForAgeMax { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public int LookingForDistanceMax { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public bool UseAgeFilter { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public bool UseDistanceFilter { get; set; }

        [Required(ErrorMessage = "Pole jest wymagane")]
        public City City { get; set; }
    }
}
