using Microsoft.AspNetCore.Mvc;

namespace Timetracker.Controllers
{
    public class TaskTableController : Controller
    {
        public IActionResult TaskTable()
        {
            return View();
        }
    }
}
