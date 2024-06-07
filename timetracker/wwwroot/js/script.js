(function () {
    let work = document.getElementById("work");
    let rest = document.getElementById("rest");
    let tasks = document.getElementById("tasks");

    jQuery.ajax({
        type: "POST",
        url: "/Profile/GetStats", 
        success: function (response) {
            work.innerHTML = response.wTime;
            rest.innerHTML = response.rTime;
            tasks.innerHTML = response.cTasks;
        },
        error: function (xhr, status, error) {
            console.error("Ошибка при отправке времени на сервер:", error);
        }
    });
}());