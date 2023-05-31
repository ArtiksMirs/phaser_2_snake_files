const Game = function (game){}
Game.prototype = {
    preload: function (){
        this.load.image('ship', 'asset/tank.png');
    },
    create: function (){
        const screenshot_20_a6Nos3OAm_transformed = this.add.image(261, 344, "ship");
        this.player = screenshot_20_a6Nos3OAm_transformed;
    },
    update: function (){
        this.player.x+=0.5;
    }

}