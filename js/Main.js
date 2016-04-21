const FPS = 30;
const MIN_DIST_TO_DETECT_DRAG = 10;
var canvas;
var canvasContext;
const PLAYER_START_UNITS = 35;
var playerUnits = [];
var playerUnitsSelected = [];

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;

var mouseDown = false;

var MOUSE_BUTTON_RIGHT = 2;

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
        //document.getElementById("debugText").innerHTML = `x: ${mousePos.x}  y: ${mousePos.y}`;

        if (mouseDown === true) {
            lassoX2 = mousePos.x;
            lassoY2 = mousePos.y;
        }
    });

    canvas.addEventListener("click", function (evt) {


        //if mouse click right
        //check which units are in area selected.
        
        //testUnit.gotoX = moustPos.x;
        //testUnit.gotoY = moustPos.y;
    });

    canvas.addEventListener("mousedown", function(evt) {
        evt.preventDefault(); //doesnt work
        
            var mousePos = calculateMousePos(evt);
            lassoX1 = mousePos.x;
            lassoY1 = mousePos.y;
            lassoX2 = mousePos.x;
            lassoY2 = mousePos.y;
            mouseDown = true;
    });

    canvas.addEventListener("mouseup", function(evt) {
            mouseDown = false;

        if (mouseMovedEnoughForDrag()) {
            playerUnitsSelected = [];

            for (var i = 0; i < playerUnits.length; i++) {
                if (playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
                    playerUnitsSelected.push(playerUnits[i]);
                }
            }
            document.getElementById("debugText").innerHTML = `Selected ${playerUnitsSelected.length} units`;
        } else {
            var moustPos = calculateMousePos(evt);
            var unitsAlongSide = Math.floor(Math.sqrt(playerUnitsSelected.length + 2));
            for (var i = 0; i < playerUnitsSelected.length; i++) {
                playerUnitsSelected[i].gotoNear(moustPos.x, moustPos.y, i, unitsAlongSide);
            }
            document.getElementById("debugText").innerHTML = `Moving to ${moustPos.x}, ${moustPos.y}`;
        }

    });

    function mouseMovedEnoughForDrag() {
        var deltaX = lassoX1 - lassoX2;
        var deltaY = lassoY1 - lassoY2;
        var dragDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        return (dragDist > MIN_DIST_TO_DETECT_DRAG);
    }

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