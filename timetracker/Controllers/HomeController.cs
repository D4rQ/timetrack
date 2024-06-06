using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Diagnostics;
using Timetracker.Models;

namespace Timetracker.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public ActionResult AddWorkTime(int timeInMinutes)
        {

            var connectionString = "workstation id=timetracker.mssql.somee.com;packet size=4096;user id=D4rQ_SQLLogin_1;pwd=9izweotsjl;data source=timetracker.mssql.somee.com;persist security info=False;initial catalog=timetracker;TrustServerCertificate=True";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var currentTime = new SqlCommand("Select WorkTime FROM AspNetUsers Where UserName = \'" + User.Identity!.Name!.ToString() + "\'", connection).ExecuteScalar().ToString();
                timeInMinutes += int.Parse(currentTime!);
                var command = new SqlCommand("UPDATE AspNetUsers SET WorkTime = " + timeInMinutes + "Where UserName = \'" + User.Identity.Name + "\'", connection);
                command.ExecuteNonQuery();
                connection.Close();
            }
            return Json(new { success = true });
        }

        public ActionResult AddRestTime(int timeInMinutes)
        {

            var connectionString = "workstation id=timetracker.mssql.somee.com;packet size=4096;user id=D4rQ_SQLLogin_1;pwd=9izweotsjl;data source=timetracker.mssql.somee.com;persist security info=False;initial catalog=timetracker;TrustServerCertificate=True";

            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var currentTime = new SqlCommand("Select RestTime FROM AspNetUsers Where UserName = \'" + User.Identity!.Name!.ToString() + "\'", connection).ExecuteScalar().ToString();
                timeInMinutes += int.Parse(currentTime!);
                var command = new SqlCommand("UPDATE AspNetUsers SET RestTime = " + timeInMinutes + "Where UserName = \'" + User.Identity.Name + "\'", connection);
                command.ExecuteNonQuery();
                connection.Close();
            }
            return Json(new { success = true });
        }

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}