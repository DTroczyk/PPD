using System.ComponentModel.DataAnnotations;

namespace Api.BLL.Entities
{
    public abstract class User
    {
        [Key]
        public string Login { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Role Role { get; set; }
        public bool Active { get; set; }
    }
}
