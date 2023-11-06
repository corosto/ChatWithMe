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
            CreateMap<CreateUserDto, User>()
                .ForMember(dto => dto.BirthDate, p => p.Ignore())
                .ForMember(dto => dto.City, p => p.Ignore())
                .ForMember(dto => dto.Interests, p => p.Ignore())
                .ForMember(dto => dto.SexualOrientations, p => p.Ignore())
                .ForMember(dto => dto.Images, p => p.Ignore());
            
            CreateMap<UserMainUpdateDto, User>()
                .ForMember(dto => dto.Interests, p => p.Ignore())
                .ForMember(dto => dto.SexualOrientations, p => p.Ignore())
                .ForMember(dto => dto.Images, p => p.Ignore());

            CreateMap<User, UserMainDto>()
                .ForMember(dto => dto.Interests, p => p.Ignore())
                .ForMember(dto => dto.SexualOrientations, p => p.Ignore())
                .ForMember(dto => dto.Images, p => p.Ignore())
                .ForMember(dto => dto.City, p => p.Ignore());

            CreateMap<User, UserBasicDto>();

            CreateMap<User, UserSideDto>();

            CreateMap<User, GetMatchDto>()
                .ForMember(dto => dto.Interests, p => p.Ignore())
                .ForMember(dto => dto.SexualOrientations, p => p.Ignore())
                .ForMember(dto => dto.Images, p => p.Ignore())
                .ForMember(dto => dto.City, p => p.Ignore());
        }
    }
}
