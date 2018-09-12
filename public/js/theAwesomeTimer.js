
//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
$(document).ready(function () {
    $("#focus-timer").hide();
    $("#break-timer").hide();
    $("#break-page").hide();
    $("#adjust-focus-page").hide();
    $("#adjust-break-page").hide();
});

///////////////////////////////////////////////////////////////
// START PAGE
///////////////////////////////////////////////////////////////
$("#new-focus").on("click", function () {
    $("#start-page").hide();
    $("#adjust-focus-page").show();
});

///////////////////////////////////////////////////////////////
// ADJUSTED FOCUS TIME
///////////////////////////////////////////////////////////////
$("#adjust-focus-button").on("click", function (event) {
    event.preventDefault();
    $("#adjust-focus-page").hide();
    $("#focus-timer").show();
    var newDuration = $("#adjust-focus").val().trim() * 60;
    console.log(newDuration);
    focusTimer(newDuration);
});

///////////////////////////////////////////////////////////////
// DEFAULT FOCUS TIME
///////////////////////////////////////////////////////////////
$("#start-button").on("click", function () {
    $("#start-page").hide();
    $("#focus-timer").show();
    var duration = 2;
    focusTimer(duration);
});

function focusTimer(duration) {
    var display = document.querySelector("#focus-time");
    // var displayTime = "52:00"; May use this for displaying timer
    
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
            $("#focus-timer").hide();
            $("#break-page").show();
        }
        
    }, 1000);


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
