const MIN_DIST_TO_DETECT_DRAG = 10;
const MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 10;
const MOUSE_BUTTON_RIGHT = 2;

var playerUnitsSelected = [];

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;

var mouseDown = false;

function mousemoveHandler(evt) {
    var mousePos = calculateMousePos(evt);
    //document.getElementById("debugText").innerHTML = `x: ${mousePos.x}  y: ${mousePos.y}`;

    if (mouseDown === true) {
        lassoX2 = mousePos.x;
        lassoY2 = mousePos.y;
    }
}

function mousedownHandler(evt) {

    var mousePos = calculateMousePos(evt);
    lassoX1 = mousePos.x;
    lassoY1 = mousePos.y;
    lassoX2 = mousePos.x;
    lassoY2 = mousePos.y;
    mouseDown = true;
}

function mouseupHandler(evt) {

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
        var mousePos = calculateMousePos(evt);
        var clickedUnit = getUnitUnderMouse(mousePos);
        if (clickedUnit !== null && clickedUnit.isPlayer === false) {
            document.getElementById("debugText").innerHTML =
                `Player commands ${playerUnitsSelected.length} units to attack`;
        } else {
            var unitsAlongSide = Math.floor(Math.sqrt(playerUnitsSelected.length + 2));
            for (var i = 0; i < playerUnitsSelected.length; i++) {
                playerUnitsSelected[i].gotoNear(mousePos.x, mousePos.y, i, unitsAlongSide);
            }
            document.getElementById("debugText").innerHTML =
                `Moving to ${mousePos.x}, ${mousePos.y}`;
        }
    }
}

function getUnitUnderMouse(currentMousePos) {
    var closestUnit = null;
    var closestDistanceFoundToMouse = MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE

    for (var i = 0; i < playerUnits.length; i++) {
        var playerDist = playerUnits[i].distanceFrom(currentMousePos.x, currentMousePos.y);
        if (playerDist < closestDistanceFoundToMouse) {
            closestUnit = playerUnits[i];
            closestDistanceFoundToMouse = playerDist;
        }
    }
    for (var i = 0; i < enemyUnits.length; i++) {
        var enemyDist = enemyUnits[i].distanceFrom(currentMousePos.x, currentMousePos.y);
        if (enemyDist < closestDistanceFoundToMouse) {
            closestUnit = enemyUnits[i];
            closestDistanceFoundToMouse = enemyDist;
        }
    }
    return closestUnit;
}

function mouseMovedEnoughForDrag() {
    var deltaX = lassoX1 - lassoX2;
    var deltaY = lassoY1 - lassoY2;
    var dragDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return (dragDist > MIN_DIST_TO_DETECT_DRAG);
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