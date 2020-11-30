using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Api.BLL.Entities;
using Api.DAL.EF;
using Api.Services.Interfaces;

namespace Api.Services.Services
{
    public class RegisterService : BaseService, IRegisterService
    {
        public RegisterService(ApplicationDbContext dbContext) : base(dbContext) { }
        
        public string Register(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Login))
                return "Login is required.";

            if (string.IsNullOrWhiteSpace(user.PasswordHash))
                return "Password is required.";

            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(user.Email);
            if (!match.Success)
                return user.Email + " is incorrect.";

            if (string.IsNullOrWhiteSpace(user.FirstName))
                return "Name is required.";

            if (string.IsNullOrWhiteSpace(user.LastName))
                return "Last name is required.";

            if (_dbContext.Users.Any(x => x.Email == user.Email && x.Login == user.Login))
            {
                return "Login or email is already taken.";
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.Active = false;
            user.Role = Role.Sparrow;

            _dbContext.Sparrows.Add((Sparrow)user);
            _dbContext.SaveChanges();
            return String.Empty;
        }
    }
}
