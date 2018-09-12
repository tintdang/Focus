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
            // $.get("/break", function(data) {
            //     console.log(data);
            // });
            // var nextPage = window.location.hostname + "/break";
            window.location.replace("/break");
        }
<<<<<<< HEAD

    }, 1000);
}

=======
    }, 1000);
}
>>>>>>> 171d16d8bcd2af17aaf46b2b1e491a622be22a19

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
<<<<<<< HEAD

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
}
=======
>>>>>>> 171d16d8bcd2af17aaf46b2b1e491a622be22a19
