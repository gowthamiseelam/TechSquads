using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;  // This namespace is required for JsonIgnore

namespace Micron_Backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Invalid Indian phone number")]

        public string PhoneNumber { get; set; }
        [Required]

        public string Email { get; set; }
        [Required]
        public string AadhaarCard { get; set; }

        [Required]
        public string Password { get; set; }

        // Exclude ConfirmPassword from serialization and Swagger UI using JsonIgnore
        [NotMapped]
        [Required]
        [JsonIgnore]  // This excludes ConfirmPassword from the JSON and Swagger
        public string ConfirmPassword { get; set; }

        [Required]
        public string Role { get; set; }
        public ICollection<Policy> Policies { get; set; }
    }
}

