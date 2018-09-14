//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
$(document).ready(function () {
    $("#catDiv").hide();
    $("#break-time").text("00:00");
});

///////////////////////////////////////////////////////////////
// Button click listeners
///////////////////////////////////////////////////////////////
$("#break-button").on("click", function () {
    console.log("click");
    $("#break-page").hide();
    $("#break-timer").show();
    var duration = 1020;
    breakTimer(duration);
});

$("#catButton").on("click", function () {
    $("#catButton").hide();
    $("#catDiv").show();
    $("#noCatButton").show();
});

$("#noCatButton").on("click", function() {
    $("#catDiv").hide();
    $("#catButton").show();
    $("#noCatButton").hide();
});

$("#workoutButton").on("click", function() {
    $("#workoutButton").hide();
    $("#workoutDiv").show();
    $("#hideWorkoutButton").show();
});

$("#hideWorkoutButton").on("click", function() {
    $("#workoutButton").show();
    $("#workoutDiv").hide();
    $("#hideWorkoutButton").hide();
});

///////////////////////////////////////////////////////////////
// DEFAULT BREAK TIME
///////////////////////////////////////////////////////////////
function breakTimer(duration) {
    var display = $("#break-time");
    var timer = duration, minutes, seconds;
    var count = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            stop(count);
            localStorage.removeItem("time");
            window.location.replace("/home");
        }
        localStorage.setItem("time", timer);
    }, 1000);
}


///////////////////////////////////////////////////////////////
// ADJUSTED BREAK TIME
///////////////////////////////////////////////////////////////
$("#new-break").on("click", function () {
    $("#break-page").hide();
    $("#adjust-break-page").show();
});

$("#adjust-break-button").on("click", function (event) {
    event.preventDefault();
    $("#adjust-break-page").hide();
    $("#break-timer").show();
    var newDuration = $("#adjust-break").val().trim() * 60;
    console.log(newDuration);
    $("#break-time").text(convertTimer(newDuration));
    breakTimer(newDuration);
});

///////////////////////////////////////////////////////////////
// STOP TIMER
///////////////////////////////////////////////////////////////
function stop(clearTimer) {
    clearInterval(clearTimer);
}

///////////////////////////////////////////////////////////////
// Timer Conversion for displayed timer
///////////////////////////////////////////////////////////////
function convertTimer(timer) {
    console.log(timer);
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
}