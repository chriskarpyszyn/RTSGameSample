const FPS = 30;
var canvas;
var canvasContext;

window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    canvas.addEventListener("mousemove", function(evt) {
        const mousePos = calculateMousePos(evt);
        document.getElementById("debugText").innerHTML = `x: ${mousePos.x}  y: ${mousePos.y}`;
    });
}

function move() {
    
}

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, "#000000"); //draw canvas
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