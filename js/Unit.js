const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_SELECT_DIM_HALF = UNIT_PLACEHOLDER_RADIUS + 3;
const UNIT_PIXELS_MOVE_RATE = 2;
const UNIT_RANKS_SPACING = 3 * UNIT_PLACEHOLDER_RADIUS;
function Unit() {

    this.resetAndSetTeam = function (playerTeam) {

        this.isPlayer = playerTeam;

        this.x = Math.random() * canvas.width / 4;
        this.y = Math.random() * canvas.height / 4;

        if (this.isPlayer === false) {
            this.x = canvas.width - this.x;
            this.y = canvas.height - this.y;
            this.unitColor = "#FF33FF";
        } else {
            this.unitColor = "#FFFFFF";
        }

        this.gotoX = this.x;
        this.gotoY = this.y;
        this.isDead = false;
    }

    this.move = function() {

        var deltaX = this.gotoX - this.x;
        var deltaY = this.gotoY - this.y;
        //var moveAngle = Math.atan2(deltaY, deltaX);
        var distToGo = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        //var moveX = UNIT_PIXELS_MOVE_RATE * Math.cos(moveAngle);
        //var moveY = UNIT_PIXELS_MOVE_RATE * Math.sin(moveAngle);
        var moveX = UNIT_PIXELS_MOVE_RATE * deltaX / distToGo;
        var moveY = UNIT_PIXELS_MOVE_RATE * deltaY / distToGo;

        if (distToGo > UNIT_PIXELS_MOVE_RATE) {
            this.x += moveX;
            this.y += moveY;
        } else {
            this.x = this.gotoX;
            this.y = this.gotoY;
        }

        //if (this.x < this.gotoX) {
        //    this.x += UNIT_PIXELS_MOVE_RATE;
        //}
        //if (this.x > this.gotoX) {
        //    this.x -= UNIT_PIXELS_MOVE_RATE;
        //}
        //if (this.y < this.gotoY) {
        //    this.y += UNIT_PIXELS_MOVE_RATE;
        //}
        //if (this.y > this.gotoY) {
        //    this.y -= UNIT_PIXELS_MOVE_RATE;
        //}
    }

    this.gotoNear = function (aroundX, aroundY, formationPos, formationDim) {

        var colNum = formationPos % formationDim;
        var rowNum = Math.floor(formationPos / formationDim);

        this.gotoX = aroundX + colNum * UNIT_RANKS_SPACING;
        this.gotoY = aroundY + rowNum * UNIT_RANKS_SPACING;
    }

    this.draw = function () {
        if (this.isDead === false) {
            colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.unitColor);
        }
    }

    this.drawSelectionBox = function() {
        colorOutlineRectCornerToCorner(this.x - UNIT_SELECT_DIM_HALF, this.y - UNIT_SELECT_DIM_HALF,
            this.x + UNIT_SELECT_DIM_HALF, this.y + UNIT_SELECT_DIM_HALF, "#33FF33");
    }

    this.isInBox = function(leftX, topY, rightX, bottomY) {

        return ((this.x - leftX) * (this.x - rightX) < 0 && (this.y - topY) * (this.y - bottomY) < 0);

    }

    this.distanceFrom = function(otherX, otherY) {
        var deltaX = otherX - this.x;
        var deltaY = otherY - this.y;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
}


