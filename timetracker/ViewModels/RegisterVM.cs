using System.ComponentModel.DataAnnotations;

namespace Timetracker.ViewModels
{
    public class RegisterVM
    {
        
        public string? Username { get; set; }
        
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Compare("Password", ErrorMessage = "Пароли не совпадают.")]
        [Display(Name = "Подтвердите пароль")]
        [DataType(DataType.Password)]
        public string? ConfirmPassword { get; set; }
    }
}
