﻿using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.ViewModels.VMs;

namespace Api.Services.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly IHttpContextAccessor _httpContext;

        public UserService(ApplicationDbContext dbContext, IHttpContextAccessor httpContext) : base(dbContext)
        {
            _httpContext = httpContext;
        }

        public async Task<Pigeon> GetPigeon()
        {
            var identity = _httpContext.HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                IList<Claim> claims = identity.Claims.ToList();
                string login = claims[0].Value;
                Pigeon user = await _dbContext.Pigeons.FirstOrDefaultAsync(u => u.Login == login);
                return user;
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }

        public async Task<SparrowVm> GetSparrow()
        {
            var identity = _httpContext.HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                IList<Claim> claims = identity.Claims.ToList();
                string login = claims[0].Value;
                var user = await _dbContext.Sparrows
                    .Where(u => u.Login == login)
                    .Select(s=>new SparrowVm{ Email = s.Email, FirstName = s.FirstName, LastName = s.LastName, Login = s.Login })
                    .SingleOrDefaultAsync();
                return user;
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }

        public async Task<Stork> GetStork()
        {
            var identity = _httpContext.HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                IList<Claim> claims = identity.Claims.ToList();
                string login = claims[0].Value;
                Stork user = await _dbContext.Storks.FirstOrDefaultAsync(u => u.Login == login);
                return user;
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }

        public async Task<User> GetUser()
        {
            var identity = _httpContext.HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                IList<Claim> claims = identity.Claims.ToList();
                string login = claims[0].Value;
                User user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Login == login);
                return user;
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }
    }
}
