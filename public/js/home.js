//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
$(document).ready(function () {
    localStorage.removeItem("time");
});

///////////////////////////////////////////////////////////////
// Button click listeners
///////////////////////////////////////////////////////////////
$("#new-focus").on("click", function () {
    $("#start-page").hide();
    $("#adjust-focus-page").show();
});

$("#mapButton").on("click", function() {
    $("#mapDiv").show();
    $("#mapButton").hide();
    $("#mapHide").show();
});

$("#mapHide").on("click", function() {
    $("#mapDiv").hide();
    $("#mapButton").show();
    $("#mapHide").hide();
});

///////////////////////////////////////////////////////////////
// ADJUSTED FOCUS TIME
///////////////////////////////////////////////////////////////
$("#adjust-focus-button").on("click", function (event) {
    event.preventDefault();
    var newDuration = $("#adjust-focus").val().trim() * 60;
    localStorage.setItem("time", newDuration);
    console.log(newDuration);
    window.location.replace("/theAwesomeTimer");
});

///////////////////////////////////////////////////////////////
// DEFAULT FOCUS TIME
///////////////////////////////////////////////////////////////
$("#start-button").on("click", function () {
    window.location.replace("/theAwesomeTimer");
});
