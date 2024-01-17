using System;

namespace POC.NET.API.Models
{
    public class Todo
    {
        public Todo(int id, string title, string description)
        {
            Id = id;
            Title = title;
            Description = description;
            CreatedDate = new DateTime();
            Status = true;
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Status { get; set; }
    }
}
