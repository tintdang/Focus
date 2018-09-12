//////////////////////////////////////////////////////////////
//INITIAL PAGE LOAD
///////////////////////////////////////////////////////////////
$(document).ready(function () {
    focusTimer(30);
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
            window.location.replace("/break");
        }
    }, 1000);
}

///////////////////////////////////////////////////////////////
// SPOTIFY ADD SONG
///////////////////////////////////////////////////////////////
var spotifyForm = $("form.songSubmit");
spotifyForm.on("click", function(event){
    event.preventDefault();
    if($("#songName").val() !== ""){
        $.post("/api/spotify", {
            songName: $("#songName").val()
        }).then(function(data){
            window.location.replace(data);
        }).catch(function(err){
            console.log(err);
        });
    }
});
