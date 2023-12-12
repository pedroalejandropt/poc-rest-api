using System;
using System.Collections.Generic;
using POC.NET.API.Models;

namespace POC.NET.API.Services
{
    public interface ITodoService
    {
        IEnumerable<Todo> List();
        Todo GetBy(Guid id);
        void Create(Todo todo);
        void Put(Guid id, Todo todo);
        void Delete(Guid id);

    }
}
