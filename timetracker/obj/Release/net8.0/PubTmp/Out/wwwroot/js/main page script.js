let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');

let workTime = 25; // Значение по умолчанию
let breakTime = 5; // Значение по умолчанию

let seconds = "00";
let intervalId = null;

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
}

function updateTimerSettings() {
    // Извлечение значений из input и их использование в таймере.
    let workInput = document.getElementById('work-time'); // Предполагаем, что это input для работы
    let breakInput = document.getElementById('rest-time'); // и для перерыва.

    workTime = parseInt(workInput.value);  // Преобразование значений work и break в числа.
    breakTime = parseInt(breakInput.value);

    if (isNaN(workTime) || workTime <= 0) workTime = 25;  // Откат к значению по умолчанию, если значение некорректно
    if (isNaN(breakTime) || breakTime <= 0) breakTime = 5;
}

function start() {
    updateTimerSettings(); // Обновляем настройки таймера из полей ввода
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    let workMinutes = workTime;
    let breakMinutes = breakTime-1;
    seconds = 59;

    document.getElementById('minutes').innerHTML = workMinutes-1;
    document.getElementById('seconds').innerHTML = seconds;

    let breakCount = 0;

    workMinutes -= 1;

    let timerFunction = () => {
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        seconds -= 1;
        if (seconds < 0) {
            seconds = 59;
            workMinutes -= 1;
        }

        if (workMinutes < 0 && breakCount % 2 === 0) {
            workMinutes = breakMinutes;
            breakCount++;
            workTitle.classList.remove('active');
            breakTitle.classList.add('active');

            $.ajax({
                type: "POST",
                url: "/Home/AddWorkTime", // Замените на соответствующий контроллер и действие
                data: { timeInMinutes: workTime },
                success: function (response) {
                    alert(response.ы);
                },
                error: function (xhr, status, error) {
                    // Обработка ошибки при отправке данных
                    console.error("Ошибка при отправке времени на сервер:", error);
                }
            });
        } else if (workMinutes < 0) {
            workMinutes = workTime - 1;
            breakCount++;
            breakTitle.classList.remove('active');
            workTitle.classList.add('active');

            $.ajax({
                type: "POST",
                url: "/Home/AddRestTime", // Замените на соответствующий контроллер и действие
                data: { timeInMinutes: breakTime },
                success: function (response) {
                    alert(response.success);
                },
                error: function (xhr, status, error) {
                    // Обработка ошибки при отправке данных
                    console.error("Ошибка при отправке времени на сервер:", error);
                }
            });
        }
    };
    intervalId = setInterval(timerFunction, 1000);
}

function addTask(){
    closePopup();
    var table = document.getElementById("tasks").getElementsByTagName('tbody')[0];

    var date = new Date();
    // Создаем новую строку в таблице
    var newRow = table.insertRow(table.rows.length);
  
    // Вставляем ячейки в строку
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
  
    // Добавляем текст в ячейки
    cell1.innerHTML = document.getElementById('task-name').value;
    cell2.innerHTML =  document.getElementById('task-importance').value;
    cell3.innerHTML =  document.getElementById('task-deadline').value;


   // Добавляем кнопку удаления в ячейку
    var completeButton = document.createElement("button");
    var img = document.createElement("img");
    img.src = "~/images/Task_Table_Graphic_Files/check.png"; // Указываем путь к вашему изображению
    img.alt = "Complete";
    img.id = "tick";
    completeButton.appendChild(img);
    completeButton.id = "complete-button"; // Добавляем id "complete-button"
    completeButton.onclick = function() {
        var row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
    };
    cell4.appendChild(completeButton);
    cell4.id = "complete-column";
}


function reset() {
    clearInterval(intervalId);

    updateTimerSettings(); // Обновляем настройки таймера из полей ввода

    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";
    breakTitle.classList.remove('active');
    workTitle.classList.add('active');
}

function openPopup(){
    document.getElementById('popup').style.display = 'block';
}

function closePopup(){
    document.getElementById('popup').style.display = 'none';
}
