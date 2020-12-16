using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Api.DAL.EF;
using Api.Services.Interfaces;
using Api.Services.Models;
using Api.ViewModels.VMs;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services.Services
{
    public class LoginService : BaseService, ILoginService
    {
        private readonly TokenManagement _tokenManagement;

        public LoginService(IOptions<TokenManagement> tokenManagement, ApplicationDbContext dbContext) : base(dbContext)
        {
            _tokenManagement = tokenManagement.Value;
        }

        public string IsAuthenticated(string login, string password)
        {
            var token = string.Empty;
            try
            {
                if (IsValidUser(login, password))
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, login),
                    };

                    ClaimsIdentity identity = new ClaimsIdentity(claims, "jwt");

                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_tokenManagement.Secret));
                    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

                    SecurityToken jwtToken = tokenHandler.CreateJwtSecurityToken(new SecurityTokenDescriptor
                    {
                        Audience = _tokenManagement.Audience,
                        Issuer = _tokenManagement.Issuer,
                        SigningCredentials = credentials,
                        NotBefore = DateTime.Now,
                        Expires = DateTime.Now.AddHours(_tokenManagement.AccessExpiration),
                        Subject = identity
                    });

                    token = tokenHandler.WriteToken(jwtToken);
                }
            }
            catch
            {
                return token;
            }
            return token;
        }

        public bool IsValidUser(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                throw new Exception("Credentials are required.");

            var user = _dbContext.Users.SingleOrDefault(u=>u.Login == login);

            if (user == null)
                throw new Exception("Login or password is incorrect.");

            if (!(BCrypt.Net.BCrypt.Verify(password, user.PasswordHash) && user.Active))
                throw new Exception("Login or password is incorrect.");

            return true;
        }
    }
}
