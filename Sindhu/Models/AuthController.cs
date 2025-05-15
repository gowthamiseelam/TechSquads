using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Micron_Backend.Models;
using Micron_Backend.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace Micron_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Register Endpoint
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Email) ||
                string.IsNullOrWhiteSpace(user.Password) ||
                string.IsNullOrWhiteSpace(user.ConfirmPassword) ||
                string.IsNullOrWhiteSpace(user.Role))
            {
                return BadRequest("Email, Password, ConfirmPassword, and Role are required.");
            }

            if (user.Password != user.ConfirmPassword)
            {
                return BadRequest("Password and Confirm Password do not match.");
            }

            var existingUser = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email.ToLower() == user.Email.Trim().ToLower());

            if (existingUser != null)
            {
                return Conflict("User already exists.");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.ConfirmPassword = ""; // Clear confirm password before saving

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var existingUser = await _context.Users
                .Include(u => u.Policies) // Load associated policies
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (existingUser == null ||
                !BCrypt.Net.BCrypt.Verify(loginRequest.Password, existingUser.Password) ||
                !string.Equals(existingUser.Role, loginRequest.Role, StringComparison.OrdinalIgnoreCase))
            {
                return Unauthorized("Invalid credentials.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, existingUser.Email),
            new Claim(ClaimTypes.Role, existingUser.Role)
        }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Token = tokenString,
                Role = existingUser.Role,
                User = new
                {
                    existingUser.Id,
                    existingUser.Name,
                    existingUser.Email,
                    existingUser.PhoneNumber,
                    existingUser.AadhaarCard,
                    Policies = existingUser.Policies.Select(p => new
                    {
                        p.Id,
                        p.PolicyName,
                        p.PolicyType,
                        p.StartDate,
                        p.EndDate,
                        p.PremiumAmount
                    })
                }
            });
        }

    }


}
