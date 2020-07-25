using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DailyTasks.DTOs
{
    [Table("Tasks")]
    public class TaskModel
    {
        public Guid Id { get; set; }

        public string TaskName { get; set; }

        public int Priority { get; set; }
        
        public string Comment { get; set; }

        public bool IsDone { get; set; }
    }
}
