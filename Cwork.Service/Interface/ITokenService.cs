using Cwork.Domain.Models.Input;

namespace Cwork.Service.Interface
{
    public interface ITokenService
    {
        string CreateToken(UserLoginDetail user);
    }
}