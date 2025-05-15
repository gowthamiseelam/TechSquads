using Microsoft.AspNetCore.Mvc;

namespace Micron_Backend.Models
{
    public class Policy
    {
        public int Id { get; set; }
        public string PolicyName { get; set; }
        public string PolicyType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        // Foreign key
        public int UserId { get; set; }
        public decimal PremiumAmount { get; set; }
        // Navigation property
        public User User { get; set; }
    }
}
