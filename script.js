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
function load() {
  let days = getDays(currMonthno,currYear);
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