using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Cwork.Domain.Models.Input;
using Cwork.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using Cwork.Domain.Models.Authentication;
using Microsoft.AspNetCore.Authorization;
using Cwork.Service.Interface;

namespace Cwork.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
        {
            if (await UserExists(registerDto.UserName))
                throw new ClientUsernameException("Username is taken");


            using var hmac = new HMACSHA512();
            var user = new UserLoginDetail
            {
                UserName = registerDto.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.UserLoginDetails.Add(user);
            await _context.SaveChangesAsync();
            return new UserDTO
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
            var user = await _context.UserLoginDetails
                .SingleOrDefaultAsync(u => u.UserName == loginDto.UserName);
            if (user == null) throw new ClientUsernameException("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) throw new ClientUsernameException("Invalid password");
            }
            return new UserDTO
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

        }
        private async Task<bool> UserExists(string username)
        {
            return await _context.UserLoginDetails.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
    public class ClientUsernameException : Exception
    {
        public ClientUsernameException(string message) : base(message) { }
    }
}