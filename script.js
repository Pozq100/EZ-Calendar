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
    let currDay = document.createTextNode(i+1);
    div.appendChild(currDay);
    document.getElementById("calendar").appendChild(div);
  }
  // Changing the Header to the current Month and Year
  setHeader(currMonthno,currYear);

}

load();