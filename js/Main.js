const FPS = 30;
var canvas;
var canvasContext;


window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    populateTeam(playerUnits, PLAYER_START_UNITS, true);
    populateTeam(enemyUnits, ENEMY_START_UNITS, false);

    startGame();

    canvas.addEventListener("mousemove", mousemoveHandler);
    canvas.addEventListener("mousedown", mousedownHandler);
    canvas.addEventListener("mouseup", mouseupHandler);
}

function move() {
    for (var i = 0; i < allUnits.length; i++) {
        allUnits[i].move();
    }

    removeDeadUnits();
}

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, "#000000"); //draw canvas

    for (var i = 0; i < allUnits.length; i++) {
        allUnits[i].draw();
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


