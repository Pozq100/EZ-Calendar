const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const currDate = new Date();
let currYear = currDate.getFullYear();
let currMonthno = currDate.getMonth();

function getDays(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function setHeader(month, year) {
  let currMonth = monthNames[month];
  document.getElementById("header").textContent = currMonth + " " + year;
}

function nextMonth() {
  currMonthno += 1;
  if (currMonthno > 11)
  {
    currMonthno = 0;
    currYear += 1;
  }
  refresh();  
}

function prevMonth() {
  currMonthno -= 1;
  if (currMonthno < 0)
  {
    currMonthno = 11;
    currYear -= 1;
  }
  refresh();
}

function refresh() {
  let cal = document.getElementById("calendar");
  while (cal.hasChildNodes())
  {
    cal.removeChild(cal.children[0]);
  }
  load();
}

function getFirstDay(month,year) {
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();
  return dayOfWeek;
}

//Loads the page
function load() {
  let days = getDays(currMonthno,currYear);
  //get the first day of the month
  let firstDay = getFirstDay(currMonthno,currYear);
  for (let i = 0; i < firstDay; i++) {
    let div = document.createElement("div");
    div.className = "empty";
    document.getElementById("calendar").appendChild(div);
  }
  // Creating the days boxes
  for (let i = 0; i < days; i++) {
    let div = document.createElement("div");
    div.className = "day";
    div.addEventListener('click', expandDay);
    let currDay = document.createTextNode(i+1);
    div.id = `${i+1}${currMonthno}${currYear}`;
    div.appendChild(currDay);
    document.getElementById("calendar").appendChild(div);
  }
  // Changing the Header to the current Month and Year
  setHeader(currMonthno,currYear);

  // add the corresponding events
  const dateData = getQueryParameters();
  if(dateData)
  {
    const day = dateData.day;
    const month = dateData.month;
    const year = dateData.year;
    const events = dateData.allEvents;
    let day_event = document.getElementById(day+month+year);
    console.log(day+month+year);
    let event_container = document.createElement("div");
    event_container.className = "eventContainer";
    day_event.appendChild(event_container);
    for (let i = 0; i < events.length;i++) {
      let div = document.createElement("div");
      div.className = "event";
      div.textContent = events[i];
      event_container.appendChild(div);
    }
  } 
}

// Get the necessary data to display the events
function getQueryParameters() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const day = urlParams.get("day");
  const month = urlParams.get("month");
  const year = urlParams.get("year");
  const allEventsString = urlParams.get("events");
  const allEvents = JSON.parse(allEventsString);
  return { day, month, year, allEvents };
}

// Goes to the selected day page
function expandDay() {
  const date = {
    year: currYear,
    month: currMonthno,
    day: this.textContent
  };
  const data = `?year=${date.year}&month=${date.month}&day=${date.day}`;
  window.location.href = "days.html" + data;
}

load();