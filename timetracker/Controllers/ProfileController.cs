using Microsoft.AspNetCore.Mvc;

namespace Timetracker.Controllers
{
    public class ProfileController : Controller
    {
        public IActionResult Profile()
        {
            return View();
        }
    }
}
