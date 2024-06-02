using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Timetracker.Controllers
{
    public class WelcomeController : Controller
    {
        public IActionResult Welcome()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }
    }
}
