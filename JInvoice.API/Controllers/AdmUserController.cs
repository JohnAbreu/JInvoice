using JInvoice.API.IdentityModels;
using JInvoice.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;

namespace JInvoice.API.Controllers
{
    [Route("AdmUser")]
    [ApiController]
    public class AdmUserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signManager;
        private readonly IConfiguration _configuration;
        public AdmUserController(UserManager<ApplicationUser> userManager,
                             SignInManager<ApplicationUser> signManager, IConfiguration configuration)
        {
            _signManager = signManager;
            _userManager = userManager;
            _configuration = configuration;
        }
        [HttpPost]
        public async Task<Object> Post(User userModel)
        {

            var applicationUser = new ApplicationUser
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                FullName = userModel.FullName,
            };

            try
            {
                var user = await _userManager.FindByEmailAsync(userModel.Email);
                if (user != null)
                {
                    return new BadRequestObjectResult("Existing User");
                }
                var result = await _userManager.CreateAsync(applicationUser, userModel.Password);
                await _userManager.AddToRoleAsync(applicationUser, userModel.Role);

                return new OkResult();
            }
            catch (System.Exception ex)
            {

                throw new Exception(ex.Message, ex.InnerException);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(User userModel)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(userModel.Email);

                if (user != null && await _userManager.CheckPasswordAsync(user, userModel.Password))
                {
                    var role = await _userManager.GetRolesAsync(user);
                    IdentityOptions identityOptions = new IdentityOptions();

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]{
                        new Claim("userid", user.Id.ToString()),
                        new Claim(identityOptions.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                        Expires = DateTime.Now.AddDays(1),
                        //NotBefore = DateTime.Now.AddMinutes(1),
                        SigningCredentials = new SigningCredentials(
                                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["secret"])),
                                                         SecurityAlgorithms.HmacSha256Signature)
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);

                    dynamic authenticatedUser = new
                    {
                        userID = user.Id,
                        token = token,
                        userName = user.UserName,
                        email = user.Email,
                        displayName = user.FullName
                    };

                    return new OkObjectResult(new { authenticatedUser });
                }
                else
                {
                    return new BadRequestObjectResult("User name or password incorrect.");
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message, ex.InnerException);
            }

        }
    }
}
