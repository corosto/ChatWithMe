using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using ChatWithMe.Entities;

namespace ChatWithMe.Models.UserDtos;

public class CreateUserDto
{
    [Required(ErrorMessage = "Pole jest wymagane")]
    [MaxLength(32, ErrorMessage ="Nazwa jest za długa")]
    [MinLength(1, ErrorMessage ="Niepoprawne dane")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    [EmailAddress(ErrorMessage = "Niepoprawne dane")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public string Password { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    [Compare("Password", ErrorMessage ="Hasła nie są takie same")]
    public string ConfirmedPassword { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public int Height { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public int Width { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public DateTime BirthDate { get; set; }

    [Required(ErrorMessage = "Pole jest wymagane")]
    public string Sex { get; set; }
    
    [Required(ErrorMessage = "Pole jest wymagane")]
    public string City { get; set; }    

    [Required(ErrorMessage = "Pole jest wymagane")]
    public string ShowMe { get; set; }    

    [Required(ErrorMessage = "Pole jest wymagane")]
    public string LookingFor { get; set; }



    //[Required(ErrorMessage = "Pole jest wymagane")]
    //public string[] Interests { get; set; }   

    //[Required(ErrorMessage = "Pole jest wymagane")]
    //public string[] SexualOrientations { get; set; }
    //
    //[Required(ErrorMessage = "Pole jest wymagane")]
    //public IFormFile[] Images { get; set; }


    public string Description { get; set; }
    public string Zodiac { get; set; }
    public string Education { get; set; }
    public string Kids { get; set; }
    public string Pets { get; set; }
    public string Alcohol { get; set; }
    public string Smoking { get; set; }
    public string Gym { get; set; }
    public string Diet { get; set; }
    public string School { get; set; }
    public string Work { get; set; }
    public string Position { get; set; }
}