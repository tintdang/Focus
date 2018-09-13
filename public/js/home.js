//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
$(document).ready(function () {
    $("#adjust-focus-page").hide();
    localStorage.removeItem("time");
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
