function nextStep() {

    let email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("Enter email or phone");
        return;
    }

    fetch("/save-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    });

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    document.getElementById("title").innerText = email;
}


function submitSimulation() {

    document.getElementById("loading").style.display = "block";

    setTimeout(function() {
        window.location.href = "/awareness";
    }, 1000);
}


let emailInput = document.getElementById("email");

if (emailInput) {

    emailInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            nextStep();
        }

    });

}


let passwordInput = document.getElementById("password");

if (passwordInput) {

    passwordInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            submitSimulation();
        }

    });

}


function submitFeedback() {

    let thoughtReal = document.querySelector(
        'input[name="thought_real"]:checked'
    );

    let triedLogin = document.querySelector(
        'input[name="tried_login"]:checked'
    );

    let whatRevealed =
        document.getElementById("whatRevealed").value.trim();


    if (!thoughtReal) {
        alert("Please answer question 1.");
        return;
    }


    if (!triedLogin) {
        alert("Please answer question 3.");
        return;
    }


    fetch("/feedback", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            thought_real: thoughtReal.value,

            what_revealed: whatRevealed,

            tried_login: triedLogin.value

        })

    })

    .then(response => response.json())

    .then(data => {

        if (data.success) {

            document.getElementById(
                "feedbackStatus"
            ).innerText =
                "Thank you! Your feedback has been submitted.";

        } else {

            document.getElementById(
                "feedbackStatus"
            ).innerText =
                data.message || "Something went wrong.";

        }

    })

    .catch(error => {

        console.error(error);

        document.getElementById(
            "feedbackStatus"
        ).innerText =
            "Unable to submit feedback.";

    });

}