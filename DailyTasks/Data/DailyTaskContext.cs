using Microsoft.EntityFrameworkCore;
using DailyTasks.DTOs;
using Microsoft.Extensions.Configuration;

namespace DailyTasks.Data
{
    public class DailyTaskContext : DbContext
    {
        public DailyTaskContext(DbContextOptions<DailyTaskContext> options) : base(options)
        {
        }

        public DbSet<TaskModel> TaskModels { get; set; }
    }
}
