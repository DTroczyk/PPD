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
                return "Pole login jest wymagane.";

            if (string.IsNullOrWhiteSpace(user.PasswordHash))
                return "Wprowadź pole hasło.";

            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(user.Email);
            if (!match.Success)
                return user.Email + " jest nieprawidłowy.";

            if (string.IsNullOrWhiteSpace(user.FirstName))
                return "Pole imię jest wymagane";

            if (string.IsNullOrWhiteSpace(user.LastName))
                return "Pole nazwisko jest wymagane";

            if (_dbContext.Users.Any(x => x.Email == user.Email && x.Login == user.Login))
            {
                return "Istnieje już konto o takim loginie lub adresie email.";
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
