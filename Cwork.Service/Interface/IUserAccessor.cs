namespace Cwork.Service.Interface
{
    public interface IUserAccessor
    {
        string UserId { get; }
        string GetCurrentUser();
        string GetUserRole();
    }
}