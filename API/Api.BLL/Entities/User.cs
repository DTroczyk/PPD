using System;
using System.Collections.Generic;
using System.Text;

namespace Api.BLL.Entities
{
    public class User
    {
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Role Role { get; set; }
    }
}
