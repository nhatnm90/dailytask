using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DailyTasks.DTOs;
using DailyTasks.Data;
using System.Threading.Tasks;
using System.Data.Entity;
using DailyTasks.Services;
using System.Data.Entity.Infrastructure;

namespace DailyTasks.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public IEnumerable<TaskModel> Get()
        {
            return _taskService.GetAllTask();
        }
        
        [HttpGet("archive")]
        public IEnumerable<TaskModel> GetArchive()
        {
            return _taskService.GetArchiveTask();
        }

        [HttpGet("{id}")]
        public TaskModel GetById(Guid id)
        {
            return _taskService.GetTaskById(id);
        }

        [HttpPost]
        public ActionResult Insert(TaskModel taskModel)
        {
            _taskService.Add(taskModel);
            return CreatedAtAction("GetById", new { id = taskModel.Id }, taskModel);
        }

        [HttpPut("{id}")]
        public ActionResult Update(Guid id, TaskModel taskModel)
        {
            var result = _taskService.Update(id, taskModel);
            return result ? CreatedAtAction("GetById", new { id = taskModel.Id }, taskModel) : throw new Exception();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {   
            return Ok(_taskService.Delete(id));
        }
        
        [HttpGet("{id}/archive")]
        public ActionResult Archive(Guid id)
        {
            return Ok(_taskService.Archive(id));
        }
    }
}
