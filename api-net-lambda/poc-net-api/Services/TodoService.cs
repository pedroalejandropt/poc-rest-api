using System;
using System.Collections.Generic;
using System.Linq;
using POC.NET.API.Models;

namespace POC.NET.API.Services
{
    public class TodoService : ITodoService
    {
        List<Todo> _todoList = new List<Todo>()
        {
            new Todo(1, "Note 1", "Description"),
            new Todo(2, "Note 2", "Description"),
            new Todo(3, "Note 3", "Description"),
            new Todo(4, "Note 4", "Description"),
        };
        public void Create(Todo todo)
        {
            todo.Id = _todoList.Count;
            _todoList.Add(todo);
        }
        public void Put(int id, Todo todo)
        {
            Todo previousTodo = _todoList.FirstOrDefault(t => t.Id == id);
            if (previousTodo is null)
                throw new ArgumentException($"Todo with Id: {id} doesn't exists.");
            
            previousTodo.Title = todo.Title;
            previousTodo.Description = todo.Description;
        }

        public void Delete(int id)
        {
            Todo todo = _todoList.FirstOrDefault(t => t.Id == id);
            if (todo is null)
                throw new ArgumentException($"Todo with Id: {id} doesn't exists.");
            
            todo.Status = false;
        }

        public Todo GetBy(int id)
        {
            Todo todo = _todoList.FirstOrDefault(t => t.Id == id);
            if (todo is null)
                throw new ArgumentException($"Todo with Id: {id} doesn't exists.");
            return todo;
        }

        public IEnumerable<Todo> List()
        {
            return _todoList.FindAll(t => t.Status == true);
        }
    }
}
