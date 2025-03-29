function digitalClock() {
    let datefunction = new Date();
    let hours = datefunction.getHours();
    let minutes = datefunction.getMinutes();
    let seconds = datefunction.getSeconds();
    let timeFormat = 'AM';

    timeFormat = hours >= 12 ? 'PM' : 'AM';
    hours = hours == 0 ? 12 : hours;
    hours = hours > 12 ? hours - 12 : hours;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.querySelector('.hours').innerHTML = hours;
    document.querySelector('.minutes').innerHTML = minutes;
    document.querySelector('.seconds').innerHTML = seconds;
    document.querySelector('.format').innerHTML = timeFormat;
}

setInterval(digitalClock, 1000);

let newDateFunction = new Date();

function renderDate() {
    // Set date to the 1st of the current month
    newDateFunction.setDate(1);

    let day = newDateFunction.getDay(); // Get the day of the week for the 1st of the month
    let currentDate = new Date(newDateFunction.getFullYear(), newDateFunction.getMonth() + 1, 0).getDate(); // Last day of the current month
    let prevDate = new Date(newDateFunction.getFullYear(), newDateFunction.getMonth(), 0).getDate(); // Last day of the previous month

    // Get next month details
    let nextMonthFirstDay = new Date(newDateFunction.getFullYear(), newDateFunction.getMonth() + 1, 1);
    let nextDays = 7 - (currentDate + day) % 7; // How many "next" days we need to fill the grid

    let month = newDateFunction.getMonth();
    let year = newDateFunction.getFullYear();
    let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Display month and year
    document.getElementById("month").innerHTML = monthArr[month] + " - " + year;

    // Display today's date
    let today = new Date();
    document.getElementById("date").innerHTML = today.toDateString();

    // Highlight the current weekday in the calendar header
    let weekDay = today.getDay();
    document.querySelectorAll('.week div')[weekDay].classList.add("active");

    // Fill in the calendar dates
    let DATES = "";

    // Add previous month's dates
    for (let x = day; x > 0; x--) {
        DATES += "<div class='prev'>" + (prevDate - x + 1) + "</div>";
    }

    // Add current month's dates
    for (let i = 1; i <= currentDate; i++) {
        if (i === today.getDate() && newDateFunction.getMonth() == today.getMonth() && newDateFunction.getFullYear() === today.getFullYear()) {
            DATES += "<div class='today'>" + i + "</div>";
        } else {
            DATES += "<div>" + i + "</div>";
        }
    }

    // Add next month's dates
    for (let k = 1; k <= nextDays; k++) {
        DATES += "<div class='next'>" + k + "</div>";
    }

    // Insert the dates into the calendar
    document.querySelector('.dates').innerHTML = DATES;
}

// Initialize calendar render on page load
renderDate();

function moveDate(para){
    
    if(para == 'prev'){
        newDateFunction.setMonth(newDateFunction.getMonth() - 1)
    }
    else if(para == 'next'){
        newDateFunction.setMonth(newDateFunction.getMonth() + 1)
    }
    renderDate()
}