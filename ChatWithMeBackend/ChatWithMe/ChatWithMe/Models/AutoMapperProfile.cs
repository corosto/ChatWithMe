using AutoMapper;
using ChatWithMe.Entities;
using ChatWithMe.Models;
using ChatWithMe.Models.UserDtos;
using System.Text.Json;

namespace MapacenBackend.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //User Image
            CreateMap<CreateUserDto, User>()
                .ForMember(dto => dto.City, p => p.Ignore())
                .ForMember(dto => dto.Interests, p => p.Ignore())
                .ForMember(dto => dto.SexualOrientations, p => p.Ignore())
                .ForMember(dto => dto.Images, p => p.Ignore());

            CreateMap<User, UserAllDto> ()
                .ForMember(dto => dto.Interests, p => p.MapFrom(e => e.Interests.Select(a => a.Interest.InterestName)))
                .ForMember(dto => dto.SexualOrientations, p => p.MapFrom(e => e.SexualOrientations.Select(a => a.SexualOrientation.SexualOrientationName)))
                .ForMember(dto => dto.Images, p => p.Ignore());

            CreateMap<User, UserBasicDto>();
        }
    }
}
