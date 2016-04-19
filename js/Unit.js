const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_PIXELS_MOVE_RATE = 2;

function Unit() {
   
    this.reset = function () {
        this.x = Math.random() * canvas.width / 4;
        this.y = Math.random() * canvas.height / 4;

        this.gotoX = this.x;
        this.gotoY = this.y;

        this.isDead = false;
    }

    this.move = function () {

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

    this.draw = function() {
        colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, "#FFFFFF");
    }
}

