// The time of day in 24H time for each row
var times = {
  0: 9,
  1: 10,
  2: 11,
  3: 12,
  4: 13,
  5: 14,
  6: 15,
  7: 16,
  8: 17,
};

// Placeholder variable for local storage events
var plans = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
};

init();

// Fn() to run on document load. Reads local storage data, and sets the plans object equal to the saved plans in local storage
function init() {
  getDate();
  var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  if (storedPlans) {
    plans = storedPlans;
  }
  displayDesc();
}

//  Get date from moment, set date in header to current date
function getDate() {
  var currentDate = moment().format("dddd, MMMM Do");
  $("#currentDay").text(currentDate);
  // return currentDate;
}

// Display descriptions stored in the plans object
function displayDesc() {
  for (i = 0; i < 9; i++) {
    // Use the JQuery selector plus a for loop to update the value of all of the textareas
    $("#" + i).val(plans[i]);
  }
}
function storeDesc() {
  // Create local storage and store the plans object in it
  localStorage.setItem("storedPlans", JSON.stringify(plans));
}

$(".hour").each(function (index, element) {
  console.log(index);
  // Get current time from moment
  var momentHour = moment().format("HH");
  // var momentHour = 11;
  // Get ID of each hour rows textboxes
  var rowHour = $(this).siblings(".description").children().attr("id");
  // If row hour < momentHour - past. If row hour === moment() - present. If hour row > moment() - future
  if (times[rowHour] < momentHour) {
    $(this).siblings(".description").addClass("past");
  } else if (times[rowHour] == momentHour) {
    $(this).siblings(".description").addClass("present");
  } else if (times[rowHour] > momentHour) {
    $(this).siblings(".description").addClass("future");
  }
});

// Save button handler
$(".saveDesc").on("click", function (event) {
  event.preventDefault();
  var hourNum = event.target.id - 9;
  console.log(event.target.id - 9);
  plans[hourNum] = $("textarea#" + hourNum).val();

  storeDesc();
});

