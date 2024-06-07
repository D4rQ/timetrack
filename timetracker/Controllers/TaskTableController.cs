using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Timetracker.Controllers
{
    [Authorize]
    public class TaskTableController : Controller
    {
        public ActionResult AddTask(string? taskName, int taskPriority, string? deadline)
        {
            var connectionString = "workstation id=timetracker.mssql.somee.com;packet size=4096;user id=D4rQ_SQLLogin_1;pwd=9izweotsjl;data source=timetracker.mssql.somee.com;persist security info=False;initial catalog=timetracker;TrustServerCertificate=True";
            bool cond = true;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var condition = new SqlCommand($"SELECT CASE WHEN EXISTS (SELECT * FROM AspNetTasks WHERE UserName = '{User.Identity!.Name}' AND TaskName = N'{taskName}' AND TaskPriority = {taskPriority} AND Deadline = '{deadline}') THEN 1 ELSE 0 END", connection).ExecuteScalar().ToString();
                cond = condition == "1";
                connection.Close();
                if (cond)
                {
                    return Json(new { success = cond });
                }
                connection.Open();
                var command = new SqlCommand($"INSERT INTO AspNetTasks VALUES ('{User.Identity!.Name}', N'{taskName}', {taskPriority}, '{deadline}')", connection);
                command.ExecuteNonQuery();
                connection.Close();
            }
            return Json(new { success = cond });
        }

        public ActionResult CompleteTask(string? taskName, int taskPriority, string? deadline)
        {
            var connectionString = "workstation id=timetracker.mssql.somee.com;packet size=4096;user id=D4rQ_SQLLogin_1;pwd=9izweotsjl;data source=timetracker.mssql.somee.com;persist security info=False;initial catalog=timetracker;TrustServerCertificate=True";
            bool cond = true;
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                var command = new SqlCommand($"DELETE FROM AspNetTasks WHERE UserName = '{User.Identity!.Name}' AND TaskName = N'{taskName}' AND TaskPriority = {taskPriority} AND Deadline = '{deadline}'", connection).ExecuteNonQuery();
                connection.Close();
            }
            return Json(new { success = cond });
        }

        public IActionResult TaskTable()
        {
            return View();
        }
    }
}
