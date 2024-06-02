namespace Timetracker.ViewModels
{
    public class ProfileVM
    {
        public string? UserName { get; set; }
        public int WorkTime {  get; set; }
        public int RestTime { get; set; }
        public int CompletedTasks { get; set; }
    }
}
