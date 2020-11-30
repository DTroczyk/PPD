using System;
using System.Collections.Generic;
using System.Text;
using Api.BLL.Entities;
using Api.ViewModels.VMs;
using AutoMapper;

namespace Api.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegistrationModel, Sparrow>()
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password));
        }
    }
}
