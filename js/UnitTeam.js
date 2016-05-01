const PLAYER_START_UNITS = 35;
const ENEMY_START_UNITS = 100;
var allUnits = [];
var playerUnits = [];
var enemyUnits = [];

var deadUnitFlag = false;

function addNewUnitToTeam(spawnedUnit, whichUnit) {
    whichUnit.push(spawnedUnit);
    allUnits.push(spawnedUnit);
}

function setDeadUnitFlag(bool) {
    deadUnitFlag = bool;
}

function populateTeam(whichTeam, howMany, isPlayerControlled) {
    for (var i = 0; i < howMany; i++) {
        var spawnUnit = new Unit();
        spawnUnit.resetAndSetTeam(isPlayerControlled);
        addNewUnitToTeam(spawnUnit, whichTeam);
    }
}

function removeDeadUnitFromList(fromArray) {
    for (var i = fromArray.length-1; i >= 0; i--) {
        if (fromArray[i].isDead) {
            fromArray.splice(i, 1);
        }
    }
}

function removeDeadUnits() {
    removeDeadUnitFromList(allUnits);
    removeDeadUnitFromList(playerUnits);
    removeDeadUnitFromList(enemyUnits);
    removeDeadUnitFromList(playerUnitsSelected);
}

function findClosestUnitInRange(fromX, fromY, maxRange, inUnitList) {
    var nearestUnitDist = maxRange;
    var nearestUnitFound = null;

    for (var i = 0; i < inUnitList.length; i++) {
        var distTo = inUnitList[i].distanceFrom(fromX, fromY);
        if (distTo < nearestUnitDist) {
            nearestUnitDist = distTo;
            nearestUnitFound = inUnitList[i];
        }
    }
    return nearestUnitFound;
}

function checkWinningState() {
    if (playerUnits.length === 0 && enemyUnits.length === 0) { //can this even happen?
        document.getElementById("debugText").innerHTML = "Draw";
    } else if (playerUnits.length === 0) {
        document.getElementById("debugText").innerHTML = "Computer wins";
    } else if (enemyUnits.length === 0) {
        document.getElementById("debugText").innerHTML = "Player wins";
    }
}