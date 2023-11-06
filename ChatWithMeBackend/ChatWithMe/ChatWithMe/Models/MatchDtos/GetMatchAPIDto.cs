using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using ChatWithMe.Entities;

namespace ChatWithMe.Models.UserDtos;

public class GetMatchAPIDto
{
    public int? LikedUserId { get; set; }
    public LikeStatus? Status { get; set; }
    public double? CurrentWidth { get; set; }
    public double? CurrentHeight { get; set; }
}