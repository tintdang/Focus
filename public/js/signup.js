$(document).ready(function() {
    var signUpForm = $("form.signup");

    // When the form is submitted, check if there is valid email and password entered
    signUpForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        };

        if(!userData.email || !userData.password) {
            return;
        }
        // Clear the form if we have a valid input and send the ajax post call function as defined below
        signUpUser(userData);
        $("#email").val("");
        $("#password").val("");
    });

    // post the user info to api/login route and if successful it will redirect us to the awesometimer!
    function signUpUser(userData) {
        console.log(userData)
        $.post("/api/signup", {
            email: userData.email,
            password: userData.password
        }).then(function(data) {
            console.log(data)
            // debugger
            if (data === "/home") {
                window.location.replace(data);
            } else {
                alert(data)
            }
            //if error throw a bootstrap alert
        }).catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});