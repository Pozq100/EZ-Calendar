const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
const dateData = getQueryParameters();

const year = dateData.year;
const month = monthNames[dateData.month];
const day = dateData.day;
let selectedEvent;
let allEvents = [];


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
    const data = `?day=${day}&month=${dateData.month}&year=${year}&events=${JSON.stringify(allEvents)}`;
    window.location.href = "index.html" + data;
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
        div.draggable = true;
        div.addEventListener("dragstart", function(e){
            selectedEvent = e.target;
        });
        let w = time_needed * 50;
        div.style = `width: ${w}px`;
        document.getElementById("eventHolder").appendChild(div)
        allEvents.push(task);
    }
}

function load() {
    document.getElementById("header").textContent = day + findOrdinal(day) + " " + month + " " + year;
    for (let i = 0; i < 24; i++) {
        let div = document.createElement("div");
        div.className = "eachHour";
        let time = document.createTextNode(i + ":00");
        div.appendChild(time);
        document.getElementById("hours").appendChild(div);
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 24; j++) {
            let div = document.createElement("div");
            div.className = "empty";
            document.getElementById("emptyboxes").appendChild(div);
        }
    }
    // Reference https://www.youtube.com/watch?v=vJn5_SytV_U&t=1s
    const emptyboxes = document.querySelectorAll(".empty");
    emptyboxes.forEach((box) => {
        box.addEventListener("dragover", (e) => {
            e.preventDefault();
            box.classList.add("hovered");
        });
        box.addEventListener("dragleave", () => {
            box.classList.remove("hovered");
        });
        box.addEventListener("drop", (e) => {
            box.appendChild(selectedEvent);
            selectedEvent = null;
            box.classList.remove("hovered");
        });
    });

}

load()
