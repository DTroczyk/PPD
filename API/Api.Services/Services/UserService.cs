using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Services.Services
{
    public class UserService : BaseService, IUserService
    {
        public UserService(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<User> GetUser(ClaimsIdentity identity)
        {
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
