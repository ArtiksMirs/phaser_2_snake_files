/**
 * Bot extension of the core snake
 * @param  {Phaser.Game} game      game object
 * @param  {String} spriteKey Phaser sprite key
 * @param  {Number} x         coordinate
 * @param  {Number} y         coordinate
 */
otherPlayers = function(game, spriteKey, x, y) {
    Snake.call(this, game, spriteKey, x, y);
    this.trend = 1;
}

otherPlayers.prototype = Object.create(Snake.prototype);
otherPlayers.prototype.constructor = otherPlayers;

/**
 * Add functionality to the original snake update method so that this bot snake
 * can turn randomly
 */
otherPlayers.prototype.tempUpdate = otherPlayers.prototype.update;
otherPlayers.prototype.update = function() {
    this.head.body.setZeroRotation();

    //ensure that the bot keeps rotating in one direction for a
    //substantial amount of time before switching directions
    if (Util.randomInt(1,20) == 1) {
        this.trend *= -1;
    }
    this.head.body.rotateRight(this.trend * this.rotationSpeed);
    this.tempUpdate();
}
