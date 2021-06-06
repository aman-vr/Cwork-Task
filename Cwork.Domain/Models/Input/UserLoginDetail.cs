namespace Cwork.Domain.Models.Input
{
    public class UserLoginDetail
    {
           public int Id { get; set; }
           public string UserName { get; set; }
           public string UserRole { get; set; } = "Guest";
           public byte[] PasswordHash { get; set; }
           public byte[] PasswordSalt { get; set; }
    }
}