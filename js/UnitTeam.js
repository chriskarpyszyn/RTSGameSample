const PLAYER_START_UNITS = 35;
const ENEMY_START_UNITS = 100;
var allUnits = [];
var playerUnits = [];
var enemyUnits = [];

function addNewUnitToTeam(spawnedUnit, whichUnit) {
    whichUnit.push(spawnedUnit);
    allUnits.push(spawnedUnit);
}

function populateTeam(whichTeam, howMany, isPlayerControlled) {
    for (var i = 0; i < howMany; i++) {
        var spawnUnit = new Unit();
        spawnUnit.resetAndSetTeam(isPlayerControlled);
        addNewUnitToTeam(spawnUnit, whichTeam);
    }
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