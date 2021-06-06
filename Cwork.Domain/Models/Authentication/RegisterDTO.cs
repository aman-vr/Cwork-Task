using System.ComponentModel.DataAnnotations;

namespace Cwork.Domain.Models.Authentication
{
    public class RegisterDTO
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string UserName { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}