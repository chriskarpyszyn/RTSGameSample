const UNIT_PLACEHOLDER_RADIUS = 5;

function Unit() {
   
    
    this.reset = function () {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;

        this.isDead = false;
    }

    this.draw = function() {
        colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, "#FFFFFF");
    }
}

