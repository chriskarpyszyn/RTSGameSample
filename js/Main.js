const FPS = 30;
var canvas;
var canvasContext;

var testUnit = new Unit();

window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    startGame();

    canvas.addEventListener("mousemove", function(evt) {
        var mousePos = calculateMousePos(evt);
        document.getElementById("debugText").innerHTML = `x: ${mousePos.x}  y: ${mousePos.y}`;
    });

    canvas.addEventListener("click", function (evt) {
        var moustPos = calculateMousePos(evt);
        testUnit.gotoX = moustPos.x;
        testUnit.gotoY = moustPos.y;
    });

    testUnit.reset();
}

function move() {
    testUnit.move();
}

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, "#000000"); //draw canvas
    testUnit.draw();
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