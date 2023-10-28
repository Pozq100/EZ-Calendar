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