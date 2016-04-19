const FPS = 30;
var canvas;
var canvasContext;
const PLAYER_START_UNITS = 25;
var playerUnits = [];

//var testUnit = new Unit();

window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    for (var i = 0; i < PLAYER_START_UNITS; i++) {
        var spawnUnit = new Unit();
        spawnUnit.reset();
        playerUnits.push(spawnUnit);
    }

    startGame();

    canvas.addEventListener("mousemove", function(evt) {
        var mousePos = calculateMousePos(evt);
        document.getElementById("debugText").innerHTML = `x: ${mousePos.x}  y: ${mousePos.y}`;
    });

    canvas.addEventListener("click", function (evt) {
        var moustPos = calculateMousePos(evt);
        for (var i = 0; i < playerUnits.length; i++) {
            var eachUnit = playerUnits[i];
            eachUnit.gotoX = moustPos.x;
            eachUnit.gotoY = moustPos.y;
        }
        //testUnit.gotoX = moustPos.x;
        //testUnit.gotoY = moustPos.y;
    });

}

function move() {
    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].move();
    }
}

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, "#000000"); //draw canvas
    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].draw();
    }
}

function startGame() {
    setInterval(function() {
        move();
        draw();
    }, 1000 / FPS);
}

function calculateMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;

    //account for margins, canvas position on page, scroll amount
    const mouseX = evt.clientX - rect.left - root.scrollLeft;
    const mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}