const FPS = 30;
var canvas;
var canvasContext;

const PLAYER_START_UNITS = 35;
const ENEMY_START_UNITS = 100;
var playerUnits = [];
var enemyUnits = [];

window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    for (var i = 0; i < PLAYER_START_UNITS; i++) {
        var spawnUnit = new Unit();
        spawnUnit.resetAndSetTeam(true);
        playerUnits.push(spawnUnit);
    }

    for (var i = 0; i < ENEMY_START_UNITS; i++) {
        var spawnUnit = new Unit();
        spawnUnit.resetAndSetTeam(false);
        enemyUnits.push(spawnUnit);
    }

    startGame();

    canvas.addEventListener("mousemove", mousemoveHandler);
    canvas.addEventListener("mousedown", mousedownHandler);
    canvas.addEventListener("mouseup", mouseupHandler);
}

function move() {
    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].move();
    }

    for (var i = 0; i < enemyUnits.length; i++) {
        enemyUnits[i].move();
    }
}

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, "#000000"); //draw canvas

    for (var i = 0; i < playerUnits.length; i++) {
        playerUnits[i].draw();
    }

    for (var i = 0; i < enemyUnits.length; i++) {
        enemyUnits[i].draw();
    }
    
    for (var i = 0; i < playerUnitsSelected.length; i++) {
        playerUnitsSelected[i].drawSelectionBox();
    }

    if (mouseDown === true) {
        colorOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, "#3399ff");
        //colorRect(lassoX1, lassoY1, lassoX2 - lassoX1, lassoY2 - lassoY1, "#003399");
    }
}

function startGame() {
    setInterval(function() {
        move();
        draw();
    }, 1000 / FPS);
}

