using System;

namespace POC.NET.API.Models
{
    public class Todo
    {
        public Todo(string title, string description, bool status)
        {
            Id = Guid.NewGuid();
            Title = title;
            Description = description;
            CreatedDate = new DateTime();
            Status = status;
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Status { get; set; }
    }
}
