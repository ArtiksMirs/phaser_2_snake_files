/**
 * Player of the core snake for controls
 * @param  {Phaser.Game} game      game object
 * @param  {String} spriteKey Phaser sprite key
 * @param  {Number} x         coordinate
 * @param  {Number} y         coordinate
 */
PlayerSnake = function(game, spriteKey, x, y , foodGroup , foodCollisionGroup,snakeHeadCollisionGroup) {
    Snake.call(this, game, spriteKey, x, y,foodGroup , foodCollisionGroup,snakeHeadCollisionGroup);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.game.canvas.onmousedown =this.spaceKeyDown.bind(this);
    this.game.canvas.onmouseup = this.spaceKeyUp.bind(this);
    //handle the space key so that the player's snake can speed up
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var self = this;
    spaceKey.onDown.add(this.spaceKeyDown, this);
    spaceKey.onUp.add(this.spaceKeyUp, this);
    this.addDestroyedCallback(function() {
        spaceKey.onDown.remove(this.spaceKeyDown, this);
        spaceKey.onUp.remove(this.spaceKeyUp, this);
    }, this);
}

PlayerSnake.prototype = Object.create(Snake.prototype);
PlayerSnake.prototype.constructor = PlayerSnake;

//make this snake light up and speed up when the space key is down
PlayerSnake.prototype.spaceKeyDown = function(e) {
    this.shadow.isLightingUp = true;
    if (this.snakeLength>=3){
        this.speed = this.fastSpeed;

    }

}
//make the snake slow down when the space key is up again
PlayerSnake.prototype.spaceKeyUp = function(e) {
    this.speed = this.slowSpeed;
    this.shadow.isLightingUp = false;
}

/**
 * Add functionality to the original snake update method so that the player
 * can control where this snake goes
 */
PlayerSnake.prototype.tempUpdate = PlayerSnake.prototype.update;
PlayerSnake.prototype.update = function() {
    //find the angle that the head needs to rotate
    //through in order to face the mouse
    console.log(this.game.input.Point)
    var mousePosX = this.game.input.activePointer.worldX;
    console.log("update")
    var mousePosY = this.game.input.activePointer.worldY;
    var headX = this.head.body.x;
    console.log(mousePosX , mousePosY)
    var headY = this.head.body.y;
    var angle = (180*Math.atan2(mousePosX-headX,mousePosY-headY)/Math.PI);
    if (angle > 0) {
        angle = 180-angle;
    }
    else {
        angle = -180-angle;
    }
    var dif = this.head.body.angle - angle;
    // this.head.body.setZeroRotation();
    //allow arrow keys to be used
    // if (this.cursors.left.isDown) {
    //     console.log("21")
    //     this.head.body.rotateLeft(this.rotationSpeed);
    // }
    // else if (this.cursors.right.isDown) {
    //     console.log("1")
    //     this.head.body.rotateRight(this.rotationSpeed);
    // }
    //decide whether rotating left or right will angle the head towards
    //the mouse faster, if arrow keys are not used
    if (dif < 0 && dif > -180 || dif > 180) {
        console.log("right")
        this.head.body.rotateRight(this.rotationSpeed);
    }
    else if (dif > 0 && dif < 180 || dif < -180) {
        console.log("left")
        this.head.body.rotateLeft(this.rotationSpeed);
    }
    else{
        console.log("STOOOP")
        this.head.body.rotateLeft(this.rotationSpeed)
    }
    if (mousePosX === undefined){
        console.log("STOP")
    }


    //call the original snake update method
    this.tempUpdate();
}
