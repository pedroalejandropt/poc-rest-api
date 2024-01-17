using System;
using System.Collections.Generic;
using POC.NET.API.Models;

namespace POC.NET.API.Services
{
    public interface ITodoService
    {
        IEnumerable<Todo> List();
        Todo GetBy(int id);
        void Create(Todo todo);
        void Put(int id, Todo todo);
        void Delete(int id);

    }
}
