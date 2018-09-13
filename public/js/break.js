$(document).ready(function () {
    // $("#focus-timer").hide();
    $("#break-timer").hide();
    // $("#break-page").hide();
    // $("#adjust-focus-page").hide();
    $("#adjust-break-page").hide();
});

///////////////////////////////////////////////////////////////
// DEFAULT BREAK TIME
///////////////////////////////////////////////////////////////
$("#break-button").on("click", function () {
    console.log("click");
    $("#break-page").hide();
    $("#break-timer").show();
    var duration = 2;
    breakTimer(duration);
});

function breakTimer(duration) {
    var display = document.querySelector("#break-time");
    // var displayTime = "17:00"; May use this for displaying timer
    var timer = duration, minutes, seconds;
    var count = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // display.textContent = displayTime;
        // setTimeout(function () {
        display.textContent = minutes + ":" + seconds;
        // }, 1000);

        if (--timer < 0) {
            stop(count);
            window.location.replace("/home");
        }
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
    breakTimer(newDuration);
});

///////////////////////////////////////////////////////////////
// STOP TIMER
///////////////////////////////////////////////////////////////
function stop(clearTimer) {
    clearInterval(clearTimer);
}