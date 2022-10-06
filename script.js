var runsound = new Audio("run.mp3");
var jumpsound = new Audio("jump.mp3");
var deadsound = new Audio("dead.mp3");







function key(event) {

    if (event.which == 13) { //Enter

        if (runWorker == 0) {
            runWorker = setInterval(run, 100);
            runsound.play();
            backgroundWorker = setInterval(background, 100);
            scoreWorker = setInterval(score, 100);
            boxId = box();
            boxWorker = setInterval(movebox, 100);
        }
    }

    if (event.which == 32) { //Space
        if (jumpWorker == 0) {
            clearInterval(runWorker);
            runsound.pause();

            jumpWorker = setInterval(jump, 100);
            jumpsound.play();


        }

    }


}

var runWorker = 0;
var runImage = 1;

function run() {

    runImage = runImage + 1;

    if (runImage == 9) {
        runImage = 1;
    }

    document.getElementById("boy").src = "Run (" + runImage + ").png";

}

var backgroundWorker = 0;
var x = 0;

function background() {

    x = x - 20;

    document.getElementById("background").style.backgroundPositionX = x + "px";

}

var jumpWorker = 0;

var jumpImage = 1;

var bmt = 409;

function jump() {

    if (jumpImage <= 6) {

        bmt = bmt - 40;

        document.getElementById("boy").style.marginTop = bmt + "px";

    }


    if (jumpImage >= 7) {

        bmt = bmt + 40;

        document.getElementById("boy").style.marginTop = bmt + "px";

    }






    jumpImage = jumpImage + 1;

    if (jumpImage == 13) {
        jumpImage = 1;

        clearInterval(jumpWorker);
        runWorker = setInterval(run, 100);

        runsound.play();

        jumpWorker = 0;

        if (backgroundWorker == 0) {
            backgroundWorker = setInterval(background, 100);

        }

        if (scoreWorker == 0) {
            scoreWorker = setInterval(score, 100);


        }

        if (boxId == 0) {
            boxId = box();
        }

        if (boxWorker == 0) {
            boxWorker = setInterval(movebox, 100);
        }

    }

    document.getElementById("boy").src = "Jump (" + jumpImage + ").png";

}

var scoreWorker = 0;

var s = 0;

function score() {

    s = s + 10;
    document.getElementById("score").innerHTML = s;
}


var boxId = 0;
var bml = 200;

function box() {

    for (var a = 0; a < 10; a++) {

        var box = document.createElement("div");
        box.className = "box";
        box.id = "d" + a;

        if (a <= 5) {

            bml = bml + 600;

        }

        if (a >= 6) {

            bml = bml + 400;

        }



        box.style.marginLeft = bml + "px";

        document.getElementById("background").appendChild(box);
    }

}

var boxWorker = 0;


function movebox() {

    for (var a = 0; a < 10; a++) {

        var z = getComputedStyle(document.getElementById("d" + a));

        var p = parseInt(z.marginLeft);

        p = p - 20;

        document.getElementById("d" + a).style.marginLeft = p + "px";


        //80 180

        if (p >= 80 & p <= 160) {

            if (bmt > 374) {

                clearInterval(runWorker);
                runWorker = -1;
                runsound.pause();


                clearInterval(jumpWorker);
                jumpWorker = -1;
                jumpsound.pause();

                clearInterval(boxWorker);

                clearInterval(backgroundWorker);

                clearInterval(scoreWorker);

                setInterval(dead, 100);
                deadsound.play();

            }

        }


    }

}

var deadImage = 1;

function dead() {

    deadImage = deadImage + 1;

    if (deadImage == 11) {
        deadImage = 10;
        document.getElementById("boy").style.marginTop = "409px";

        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = s;

    }

    document.getElementById("boy").src = "Dead (" + deadImage + ").png";
}

function r() {
    location.reload();
}