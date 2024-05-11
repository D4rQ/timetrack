using System.ComponentModel.DataAnnotations;

namespace Timetracker.ViewModels
{
    public class LoginVM
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Display(Name = "\rЗапомнить меня")]
        public bool RememberMe { get; set; }
    }
}
