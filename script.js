"use strict";

// Load the images when the page loads, not before it. (this considerably increases loading times)
window.onload = function() {
    images.innerHTML = `
    <img src="images/portrait_mcgovern.png" alt="mcgovern portrait" id="portrait_mcgovern">
    <img src="images/portrait_nixon.png" alt="nixon portrait" id="portrait_nixon">
    `
}

// Context Menu
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    console.log("Ironic, we didn't find the context...");
});

// Custom cursor div events.
document.addEventListener("mousemove", function(e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});
document.addEventListener("mouseleave", function (e) {
    cursor.style.display = "none";
});
document.addEventListener("mouseover", function (e) {
    cursor.style.display = "block";
});

// Begin voting button.
beginVotingButton.addEventListener("click", function (e) {
    flipMachine();
});

// Begin voting process.
function flipMachine() {
    booth.classList.add("flip");
    booth.addEventListener("animationend", transitionEndCallback);
    if (voteStep == 0) {
        // If no voting has been done.
        createVotingBooth();
    } else if (voteStep == -1) {
        // If the user voted for the RIGHT choice.
        createCongratulatoryNote();
    } else if (voteStep >= 13) {
        // If the user voted for the wrong choice.
        createSadNote();
    }
}

// Remove flip animation from booth.
function transitionEndCallback(e) {
    booth.removeEventListener("animationend", transitionEndCallback);
    booth.classList.remove("flip");
}

// Set up buttons for voting.
function createVotingBooth() {
    // Convert internals.
    booth.innerHTML = `
    <div class="text">
        <h1>VOTE</h1>
        <h2 id="voteheading">Select the candidate you would like to vote for:</h2>
    </div>
    <div class="buttonContainer" id="buttonContainer">
        <div class="button" id="nixon">
            RICHARD M. NIXON
        </div>
        <div class="button" id="mcgovern">
            george s. mcgovern
        </div>
    </div>
    `;
    images.innerHTML = `
    <img src="images/portrait_mcgovern.png" alt="mcgovern portrait" id="portrait_mcgovern">
    <img src="images/portrait_nixon.png" alt="nixon portrait" id="portrait_nixon">
    `
    document.getElementById("nixon").addEventListener("click", nixonVote);
    document.getElementById("mcgovern").addEventListener("click", mcgovernVote);
}

// Congratulate the user for voting for the right person.
function createCongratulatoryNote() {
    // Convert internals.
    booth.innerHTML = `
    <div class="text">
        <h1>CONGRATULATIONS!!!</h1>
        <h2>Thank you for making the right choice in this Presidential Election!</h2>
    </div>
    <div class="buttonContainer">
        <div class="button bigButton" id="quit">
            END VOTING SESSION
        </div>
    </div>
    `;
    images.innerHTML = `
    <img src="images/nixon_thumbs_up.png" alt="nixon thumbs up" id="nixon_thumbs">
    `
    document.getElementById("quit").addEventListener("click", function () { document.location.reload() })
}

// Shame the user for voting for the wrong person.
function createSadNote() {
    // Convert internals.
    booth.innerHTML = `
    <div class="text">
        <h1>You Made A Choice!</h1>
        <h2>... that doesn't mean it was the right choice.</h2>
    </div>
    <h3>We wish you would reconsider but we can't change your vote now. Security will see you out, thank you for using this voting machine.</h3>
    <div class="buttonContainer">
        <div class="button bigButton" id="quit">
            WALLOW IN SELF-HATRED
        </div>
    </div>
    `;
    images.innerHTML = ``
    document.getElementById("quit").addEventListener("click", function () { document.location.reload() })
}

// Voting system.
let voteStep = 0;

// Votes either count up or down the votestep, determining what happens on screen next.
function nixonVote() {
    voteStep = -1;
    flipMachine();
}
function mcgovernVote() {
    voteStep ++;
    itsGoofyTime();
}

// Modify the environment to trick user into voting for Nixon.
function itsGoofyTime() {
    // A series of events that slow the user from being able to vote for mcgovern.
    let voteHeading = document.getElementById("voteheading");
    let nixonB = document.getElementById("nixon");
    let mcgovernB = document.getElementById("mcgovern");
    let nixonPortrait = document.getElementById("portrait_nixon");
    switch (voteStep) {
        case 1:
            voteHeading.innerText = "VOTE FOR THE RIGHT CANDIDATE";
            break;
        case 2:
            voteHeading.innerText = "Double check that you didn't click the wrong button.";
            break;
        case 3:
            voteHeading.innerText = "THIS is the button to vote for Nixon";
            nixonB.classList.toggle("attentionButton");
            break;
        case 4:
            voteHeading.innerText = "Reconsider your choice...";
            nixonB.classList.toggle("attentionButton");
            break;
        case 5:
            voteHeading.innerText = "Please... 🥺";
            nixonPortrait.src = "images/nixonmad1.png";
            break;
        case 6:
            voteHeading.innerText = "Activating alternative methods of voter re-education... I mean uh...";
            nixonPortrait.src = "images/portrait_nixon.png";
            break;
        case 7:
            voteHeading.innerText = "Do our country a great favor and vote for Nixon.";
            nixonPortrait.src = "images/nixonmad3.png";
            mcgovernB.classList.toggle("tinyButton");
            break;
        case 8:
            voteHeading.innerText = "VOTE NIXON";
            nixonPortrait.src = "images/portrait_nixon.png";
            mcgovernB.classList.toggle("tinyButton");
            mcgovernB.classList.toggle("wiggleButton");
            break;
        case 9:
            voteHeading.innerText = "You can't click it now.";
            mcgovernB.classList.toggle("wiggleButton");
            initiateRun();
            break;
        case 10:
            endRun();
            voteHeading.innerText = "VOTE NIXON NOW";
            nixonPortrait.src = "images/nixonmad2.png";
            nixonPortrait.style.animationName = "shake";
            nixonPortrait.style.right = "-80px";
            nixonPortrait.style.bottom = "-10px";
            break;
        case 11:
            voteHeading.innerText = "I think this is fairly obvious.";
            nixonB.classList.toggle("humongousButton");
            nixonPortrait.style = "";
            nixonPortrait.src = "images/portrait_nixon.png";
            break;
        case 12:
            voteHeading.innerText = "😑";
            nixonB.classList.toggle("humongousButton");
            break;
        case 13:
            voteHeading.innerText = "Don't bother wasting your time.";
            for (let i = 0; i <= 10; i++) {
                let rand = Math.random();
                if (rand < 0.5) {
                    let button = document.createElement("div");
                    button.classList.add("button");
                    button.classList.add("delete");
                    button.id = "mcgovern";
                    button.innerText = "george s. mcgovern";
                    document.getElementById("buttonContainer").appendChild(button);
                    button.addEventListener("click", function (e) {
                        this.parentNode.removeChild(this);
                    });
                } else {
                    let button = document.createElement("div");
                    button.classList.add("button");
                    button.classList.add("delete");
                    button.id = `mcgovern`;
                    button.innerText = "george s. mcgovern";
                    document.getElementById("buttonContainer").appendChild(button);
                    button.addEventListener("click", function (e) {
                        this.parentNode.removeChild(this);
                    });
                    let buttonContainer = document.getElementById("buttonContainer");
                    buttonContainer.insertBefore(button, buttonContainer.childNodes[2]);
                }
            }
            break;
        case 14:
            let buttonsToDelete = document.getElementsByClassName("delete");
            for (let i = 0; i < buttonsToDelete.length; i++) {
                buttonsToDelete[i].destroy();
            }
            voteHeading.innerText = "Final vote check. Pick the candidate you believe is right for our country.";
            break;
        default:
            flipMachine();
            break;
    }
}

// Create fake mcgovern buttons

// Get the button to run from the mouse.
function initiateRun() {
    window.setInterval(buttonMove, 1);
    let button = document.getElementById("mcgovern");
    button.addEventListener("mouseover", pauseRun);
    button.addEventListener("click", endRun);

    button.style.position = "absolute";
    button.style.transition = "none";
}
// Violently wiggle the button around.
function buttonMove () {
    let button = document.getElementById("mcgovern");
    let buttonRect = button.getBoundingClientRect();
    let boothRect = booth.getBoundingClientRect();

    // Move the button right, as well as up or down, and make sure to loop it around the screen.
    button.style.left = buttonRect.left + 15 + "px";
    button.style.top = buttonRect.top + (Math.floor(Math.random() * (15 - -15 +1)) + -15) + "px";
    if (buttonRect.left > window.innerWidth) {
        button.style.left = 0 - button.clientWidth + "px";
    }
    if (buttonRect.top < 0) {
        button.style.top = window.innerHeight - buttonRect.height + "px";
    } else if (buttonRect.top + buttonRect.height >= window.innerHeight) {
        button.style.top = 0 + "px";
    }
}
// Stop the button from darting around.
function pauseRun(e) {
    let button = document.getElementById("mcgovern");
    button.style.transition = "all 0.1s";
    window.clearInterval(0);
    window.clearInterval(1);
    button.removeEventListener("mouseover", pauseRun);
    button.style.left = e.clientX + "px"
    button.style.top = e.clientY + "px";
}
// Reset the darting button.
function endRun() {
    let button = document.getElementById("mcgovern");
    button.removeEventListener("click", endRun);
    button.style = "";
}