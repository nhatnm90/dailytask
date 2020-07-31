using DailyTasks.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace DailyTasks.Services
{
    public interface ITaskService
    {
        IEnumerable<TaskModel> GetAllTask();
        
        IEnumerable<TaskModel> GetArchiveTask();

        TaskModel GetTaskById(Guid id);

        bool Update(Guid id, TaskModel taskModel);

        void Add(TaskModel taskModel);

        bool Delete(Guid id);
        
        bool Archive(Guid id);

    }
}
