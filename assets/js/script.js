var hours = $(".hour");
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
  0: "Test",
  1: "Test",
  2: "1",
  3: "",
  4: "2",
  5: "3",
  6: "",
  7: "",
  8: "",
};

// Display descriptions stored in the plans object
function displayDesc() {
  for (i = 0; i < 9; i++) {
    $("#" + i).val(plans[i]);
  }
}

function storeDesc(){
    // Create local storage 
    localStorage.setItem("storedPlans", JSON.stringify(plans));
}

displayDesc();
$(".hour").each(function (index, element) {
  console.log(index);
  // Get current time from moment
  // var momentHour = moment().format("HH");
  var momentHour = "11";
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
$(".saveDesc").on("click", function(event){
  event.preventDefault();
  var hourNum = event.target.id;
  console.log((hourNum-9));
  plans[hourNum] = $("textarea#" + hourNum);

})


function init(){
  var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  if(storedPlans){
    plans = storedPlans;
  }
}
