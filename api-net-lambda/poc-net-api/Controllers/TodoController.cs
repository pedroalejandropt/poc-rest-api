using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using POC.NET.API.Models;
using POC.NET.API.Services;

namespace POC.NET.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : Controller
    {
        private readonly ITodoService _todoService;
        private readonly ILogger<TodoController> _logger;

        public TodoController(ITodoService todoService, ILogger<TodoController> logger)
        {
            _todoService = todoService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Todo>> Get()
        {
            return _todoService.List();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetBy(int id)
        {
            try
            {
                Todo todo = _todoService.GetBy(id);
                return Ok(todo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Todo todo)
        {
            try
            {
                _todoService.Create(todo);
                return Ok("Note created!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Todo todo)
        {
            try
            {
                _todoService.Put(id, todo);
                return Ok("Note updated!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                _todoService.Delete(id);
                return Ok("Note deleted!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}