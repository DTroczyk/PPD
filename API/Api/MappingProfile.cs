﻿using System;
using System.Collections.Generic;
using System.Text;
using Api.BLL.Entities;
using Api.ViewModels.DTOs;
using Api.ViewModels.VMs;
using AutoMapper;

namespace Api.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegistrationDto, Sparrow>()
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password));
            CreateMap<ParcelDto, Parcel>();
        }
    }
}
