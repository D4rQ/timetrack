// let workTittle = document.getElementById('work');
// let breakTittle = document.getElementById('break');

// let workTime = 25;
// let breakTime = 5;

// let seconds= "00";
// //display
// window.onload = () =>{
//     document.getElementById('minutes').innerHTML = workTime;
//     document.getElementById('seconds').innerHTML = seconds;

//     workTittle.classList.add('active');
// }
// //start timer
// function start(){
//     //change button
//     document.getElementById('start').style.display = "none";
//     document.getElementById('reset').style.display = "block";


//     //change the time
//     seconds = 59;

//     let workMinutes = workTime - 1;
//     let breakMinutes = breakTime - 1;

//     breakCount = 0;
//     //countdown
//     let timerFunction = () => {
//         //change the display
//         document.getElementById('minutes').innerHTML = workMinutes;
//         document.getElementById('seconds').innerHTML = seconds;
        
//         //start
//         seconds = seconds-1;
//         if (seconds <= 9 && seconds >= 0) {
//             seconds = '0' + seconds;
//         }
//         if(seconds < 0) {
//             seconds = 59;
//             workMinutes = workMinutes - 1;
//         }

//         if(seconds === 0){
//             workMinutes = workMinutes -1;
//             if(workMinutes === -1){
//                 if(breakCount % 2 === 0){
//                     //start break
//                     workMinutes = breakMinutes;
//                     breakCount++;

//                     //change the painel
//                     workTittle.classList.remove('active');
//                     breakTittle.classList.add('active');
//                 }else{
//                     //continue work
//                     workMinutes = workTime;
//                     breakCount++

//                     //change the painel
//                     breakTittle.classList.remove('active');
//                     workTittle.classList.add('active');
                    
//                 }
//             }
//             seconds= 59;
//         }

//     }
//     //start countdown
//     setInterval(timerFunction,1000); //1000 = 1s

// }

// let workTittle = document.getElementById('work');
// let breakTittle = document.getElementById('break');

// let workTime = 25;
// let breakTime = 5;

// let seconds = "00";
// let intervalId = null; // Добавляем переменную для хранения идентификатора интервала

// //display
// window.onload = () => {
//     document.getElementById('minutes').innerHTML = workTime;
//     document.getElementById('seconds').innerHTML = seconds;

//     workTittle.classList.add('active');
// }

// function start() {
//     document.getElementById('start').style.display = "none";
//     document.getElementById('reset').style.display = "block";

//     seconds = 59;
//     let workMinutes = workTime - 1;
//     let breakMinutes = breakTime - 1;
//     let breakCount = 0;

//     let timerFunction = () => {
//         document.getElementById('minutes').innerHTML = workMinutes;
//         document.getElementById('seconds').innerHTML = seconds;

//         seconds -= 1;
//         if (seconds <= 9 && seconds >= 0) {
//             seconds = '0' + seconds;
//         }
//         if (seconds < 0) {
//             seconds = 59;
//             workMinutes -= 1;
//         }

//         if (workMinutes === -1 && breakCount % 2 === 0) {
//             workMinutes = breakMinutes;
//             breakCount++;
//             workTittle.classList.remove('active');
//             breakTittle.classList.add('active');
//         } else if (workMinutes === -1) {
//             workMinutes = workTime;
//             breakCount++;
//             breakTittle.classList.remove('active');
//             workTittle.classList.add('active');
//         }
//     }

//     intervalId = setInterval(timerFunction, 1000);
// }

// function reset() {
//     clearInterval(intervalId); // Останавливаем интервал

//     // Возвращаем стандартные значения таймера и интерфейса
//     workTime = 25;
//     breakTime = 5;
//     seconds = "00";
//     document.getElementById('minutes').innerHTML = workTime;
//     document.getElementById('seconds').innerHTML = seconds;
//     document.getElementById('start').style.display = "block";
//     document.getElementById('reset').style.display = "none";
//     breakTittle.classList.remove('active');
//     workTittle.classList.add('active');
// }
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
        } else if (workMinutes < 0) {
            workMinutes = workTime - 1;
            breakCount++;
            breakTitle.classList.remove('active');
            workTitle.classList.add('active');
        }
    };
    intervalId = setInterval(timerFunction, 1000);
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
