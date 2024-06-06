using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Timetracker.Controllers
{
    [Authorize]
    public class ProfileController : Controller
    {
        public ActionResult GetStats()
        {
            var connectionString = "workstation id=timetracker.mssql.somee.com;packet size=4096;user id=D4rQ_SQLLogin_1;pwd=9izweotsjl;data source=timetracker.mssql.somee.com;persist security info=False;initial catalog=timetracker;TrustServerCertificate=True";
            string? workTime, restTime, tasks;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                workTime = new SqlCommand($"SELECT WorkTime FROM AspNetUsers WHERE UserName = '{User.Identity!.Name}'", connection).ExecuteScalar().ToString();
                restTime = new SqlCommand($"SELECT RestTime FROM AspNetUsers WHERE UserName = '{User.Identity!.Name}'", connection).ExecuteScalar().ToString();
                tasks = new SqlCommand($"SELECT CompletedTasks FROM AspNetUsers WHERE UserName = '{User.Identity!.Name}'", connection).ExecuteScalar().ToString();
                connection.Close();
            }
            return Json(new { success = true, wTime = workTime, rTime = restTime, cTasks = tasks });
        }

        public IActionResult Profile()
        {
            return View();
        }
    }
}
