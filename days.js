const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
const dateData = getQueryParameters();

const year = dateData.year;
const month = monthNames[dateData.month];
const day = dateData.day;

function getQueryParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const year = urlParams.get("year");
    const month = urlParams.get("month");
    const day = urlParams.get("day");

    return { year, month, day };
}
function findOrdinal(day) {
    let ordinal = "";
    if (day >= 11 && day <= 19) {
        ordinal = "th";
    }
    else {
        day = day % 10;
        if (day == 1) {
            ordinal = "st";
        } else if (day == 2) {
            ordinal = "nd";
        } else if (day == 3) {
            ordinal = "rd";
        } else {
            ordinal = "th";
        }
    }
    return ordinal
}

function back() {
    history.back();
}

function saveData() {
    const e = document.getElementById("event").value;
    const t = document.getElementById("time").value;
    $("#inputModal").modal("hide");
    document.getElementById("event").value = "";
    document.getElementById("time").value = "";
    createEvent(e,t);
}

function createEvent(task,time_needed) {
    if (time_needed > 24 || time_needed <= 0) {
        alert("Invalid input, please enter a time interval of 1-24");
    }
    else {
        let div = document.createElement("div");
        div.className = "event";
        div.textContent = task;
        div.addEventListener('mousedown', (e) => {
            makeDraggable(div);
        });
        let w = time_needed * 50;
        div.style = `width: ${w}px`;
        document.getElementById("eventHolder").appendChild(div)
    }
}

function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;
    let currentX, currentY;

    element.style.cursor = 'grab';

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        currentX = element.getBoundingClientRect().left;
        currentY = element.getBoundingClientRect().top;
        element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        // Calculate the new position relative to the current position
        const translateX = x - currentX;
        const translateY = y - currentY;

        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'grab';
        }
    });
}

function load() {
    document.getElementById("header").textContent = day + findOrdinal(day) + " " + month + " " + year;
    for (let i = 0; i < 24;i ++) 
    {
        let div = document.createElement("div");
        div.className = "eachHour";
        let time = document.createTextNode(i +":00");
        div.appendChild(time);
        document.getElementById("hours").appendChild(div);
    }
    for (let i = 0;i < 6; i ++)
    {
        for (let j = 0;j < 24; j ++)
        {
            let div = document.createElement("div");
            div.className = "empty";
            document.getElementById("emptyboxes").appendChild(div);
        }
    }
}

load()