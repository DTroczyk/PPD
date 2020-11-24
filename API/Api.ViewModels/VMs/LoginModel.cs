using System.ComponentModel.DataAnnotations;

namespace Api.ViewModels.VMs
{
    public class LoginModel
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
