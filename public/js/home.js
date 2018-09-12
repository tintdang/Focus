
//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
$(document).ready(function () {
    // $("#focus-timer").hide();
    // $("#break-timer").hide();
    // $("#break-page").hide();
    $("#adjust-focus-page").hide();
    // $("#adjust-break-page").hide();
    focusTimer(30);
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
    // $("#adjust-focus-page").hide();
    // $("#focus-timer").show();
    var newDuration = $("#adjust-focus").val().trim() * 60;
    console.log(newDuration);
    // focusTimer(newDuration);
});

///////////////////////////////////////////////////////////////
// DEFAULT FOCUS TIME
///////////////////////////////////////////////////////////////
$("#start-button").on("click", function () {
    // $("#start-page").hide();
    // $("#focus-timer").show();
    var duration = 2;
    focusTimer(duration);
});
