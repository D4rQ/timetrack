function addTask(){
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
    cell1.innerHTML = "Task" + table.rows.length;
    cell2.innerHTML =  table.rows.length;
    cell3.innerHTML =  date.getFullYear() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getDate();

    //кнопка тест
   // Добавляем кнопку удаления в ячейку
    var completeButton = document.createElement("button");
    var img = document.createElement("img");
    img.src = "Task_Table_Graphic_Files/check.png"; // Указываем путь к вашему изображению
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