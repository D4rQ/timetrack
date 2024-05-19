using Microsoft.AspNetCore.Identity;

namespace Timetracker.Models
{
    public class AppUser : IdentityUser
    {
        public int WorkTime { get; set; }
        public int RestTime { get; set; }
        public int CompletedTasks { get; set; }
        

    }
}
