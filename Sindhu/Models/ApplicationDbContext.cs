using Microsoft.EntityFrameworkCore;
using Micron_Backend.Models;

namespace Micron_Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Policy> Policies { get; set; } // Add this line

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map Users to dbo.Users table
            modelBuilder.Entity<User>().ToTable("Users", "dbo");

            // Map Policies to dbo.Policies table (optional but recommended)
            modelBuilder.Entity<Policy>().ToTable("Policies", "dbo");

            // Configure one-to-many relationship
            modelBuilder.Entity<Policy>()
                .HasOne(p => p.User)
                .WithMany(u => u.Policies)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Optional: deletes policies when user is deleted
        }
    }
}