

//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
$(document).ready(function () {
  $("#focus-timer").hide();
  $("#break-timer").hide();
  $("#break-page").hide();
});

///////////////////////////////////////////////////////////////
// SPOTIFY ADD SONG
///////////////////////////////////////////////////////////////
var spotifyForm = $("form.songSubmit");
spotifyForm.on("click", function(event){
  event.preventDefault();
  if($("#songName").val() != ""){
    $.post("/api/spotify", {
      songName: $("#songName").val()
    }).then(function(data){
      console.log(data);
    }).catch(function(err){
      console.log(err);
    });
  }
});


///////////////////////////////////////////////////////////////
// FOCUS TIMER
///////////////////////////////////////////////////////////////
$("#start-button").on("click", function () {
  $("#start-page").hide();
  $("#focus-timer").show();
  var duration = 30;
  var display = document.querySelector("#focus-time");
  focusTimer(duration, display);
});

function focusTimer(duration, display) {
  var displayTime = "52:00";
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
}

///////////////////////////////////////////////////////////////
// BREAK TIMER
///////////////////////////////////////////////////////////////


$("#break-button").on("click", function () {
  console.log("click");
  $("#break-page").hide();
  $("#break-timer").show();
  var duration = 1;
  var display = document.querySelector("#break-time");
  breakTimer(duration, display);
});


// Break Timer
function breakTimer(duration, display) {
  var displayTime = "17:00";
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

// TIMER STOP
function stop(clearTimer) {
  clearInterval(clearTimer);
}