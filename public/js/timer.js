//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
$(document).ready(function () {
    $("#focus-timer").hide();
    $("#break-timer").hide();
    $("#break-page").hide();
});

///////////////////////////////////////////////////////////////
// Button Click Listeners
///////////////////////////////////////////////////////////////
$("#start-button").on("click", function () {
    $("#start-page").hide();
    $("#focus-timer").show();
    var duration = 3120;
    var display = document.querySelector("#focus-time");
    focusTimer(duration, display);
});

$("#break-button").on("click", function () {
    console.log("click");
    $("#break-page").hide();
    $("#break-timer").show();
    var duration = 1020;
    var display = document.querySelector("#break-time");
    breakTimer(duration, display);
});

///////////////////////////////////////////////////////////////
// FOCUS TIMER - USED FOR BREAK TIMER
///////////////////////////////////////////////////////////////
function focusTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var count = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            stop(count);
            $("#focus-timer").hide();
            $("#break-page").show();
        }
    }, 1000);
}

///////////////////////////////////////////////////////////////
// BREAK TIMER
///////////////////////////////////////////////////////////////

function breakTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var count = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            stop(count);
            $("#break-timer").hide();
            $("#start-page").show();
        }
    }, 1000);
}

///////////////////////////////////////////////////////////////
// STOP TIMER
///////////////////////////////////////////////////////////////
function stop(clearTimer) {
    clearInterval(clearTimer);
}