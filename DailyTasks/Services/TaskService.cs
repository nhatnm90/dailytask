using DailyTasks.Data;
using DailyTasks.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace DailyTasks.Services
{
    public class TaskService : ITaskService
    {
        private readonly DailyTaskContext _context;
        public TaskService(DailyTaskContext context)
        {
            this._context = context;
        }

        public void Add(TaskModel taskModel)
        {
            taskModel.CreatedDate = DateTime.Now;
            _context.TaskModels.Add(taskModel);
            _context.SaveChanges();
        }

        public bool Delete(Guid id)
        {
            var task = this.GetTaskById(id);
            if (task == null) return false;
            _context.TaskModels.Remove(task);
            _context.SaveChanges();
            return true;
        }

        public bool Archive(Guid id)
        {
            var task = this.GetTaskById(id);
            if (task == null) return false;
            task.IsDone = true;
            _context.SaveChanges();
            return true;
        }

        public IEnumerable<TaskModel> GetAllTask()
        {
            var a = _context.TaskModels.ToList();
            return _context.TaskModels.Where(x => !x.IsDone).ToList();
        }
        
        public IEnumerable<TaskModel> GetArchiveTask()
        {
            return _context.TaskModels.Where(x => x.IsDone).ToList();
        }

        public TaskModel GetTaskById(Guid id)
        {
            return _context.TaskModels.Find(id);
        }

        public bool Update(Guid id, TaskModel taskModel)
        {
            var task = this.GetTaskById(id);
            if (task == null) return false;
            task.IsDone = taskModel.IsDone;
            task.Priority = taskModel.Priority;
            task.TaskName = taskModel.TaskName;
            task.Comment = taskModel.Comment;
            _context.SaveChanges();
            return true;
        }
    }
}
