var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        initFood: initFood
    }
};
var game = new Phaser.Game(config)
function initFood(x , y){
    console.log("init")
    var f = new Food(this.game, x, y);
    f.sprite.body.setCollisionGroup(this.foodCollisionGroup);
    this.foodGroup.add(f.sprite);
    f.sprite.body.collides([this.snakeHeadCollisionGroup]);

    return f;
}
function preload(){
    console.log("preload")
    //load assets
    this.load.image('circle','asset/circle.png');
    this.load.image('shadow', 'asset/white-shadow.png');
    this.load.image('background', 'asset/tile.png');
    this.load.image("border" , "asset/border.png")
    this.load.image('eye-white', 'asset/eye-white.png');
    this.load.image('eye-black', 'asset/eye-black.png');

    this.load.image('food', 'asset/hex.png');
}
async function create(){
    var width = config.width;
    var height = config.height;

    this.socket=  this.game.socket;
    console.log(width , height)
    this.matter.world.setBounds(-width, -height, width*2, height*2);

    //add tilesprite background
    console.log(-width , -height , this.matter.world.width , this)
    this.background = this.add.tileSprite(0, 0, width, height, "background")
        .setOrigin(0)
        .setScrollFactor(0, 1); //this line keeps
    // this.game.add.tileSprite(-width , -height , this.game.world.width , 20 , "border")
    // this.game.add.tileSprite(-width , -height , 20 , this.game.world.height , "border")
    // this.game.add.tileSprite(width , height , -this.game.world.width , -20 , "border")
    // this.game.add.tileSprite(width , height , -20 , -this.game.world.height , "border")
    //initialize physics and groups
    // this.physics.startSystem(Phaser.Physics.P2JS);
    // this.foodGroup = this.game.add.group();
    // this.snakeHeadCollisionGroup = this.game.physics.p2.createCollisionGroup();
    // this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();

    //add food randomly
    // for (var i = 0 ; i < 12 ; i++) {
    //     this.initFood(Util.randomInt(-width, width), Util.randomInt(-height, height));
    // }

    // this.game.snakes = [];
    // this.players = this.game.add.group();
    // const self = this;
    // this.addPlayer = ()=>{
    //     console.log(this.foodGroup)
    //     var snake = new PlayerSnake(this.game, 'circle', 0, 0,this.foodGroup,this.foodCollisionGroup,this.snakeHeadCollisionGroup);
    //     this.game.camera.follow(snake.head);
    // }
    // this.addOtherPlayers = (playerInfo)=>{
    //     var snake = new otherPlayers(this.game , "circle" , playerInfo.x , playerInfo.y);
    //
    // }
    //
    // await this.socket.on('currentPlayers', function (players) {
    //     Object.keys(players).forEach(function (id) {
    //         console.log(players , id)
    //         if (players[id].playerId === self.socket.id) {
    //             self.addPlayer()
    //         }
    //         else{
    //             self.addOtherPlayers(players[id])
    //         }
    //     });
    //     for (var i = 0 ; i < self.game.snakes.length ; i++) {
    //         var snake = self.game.snakes[i];
    //         console.log(snake , "snakeee")
    //         snake.head.body.setCollisionGroup(self.snakeHeadCollisionGroup);
    //         snake.head.body.collides([self.foodCollisionGroup]);
    //         //callback for when a snake is destroyed
    //         snake.addDestroyedCallback(self.snakeDestroyed, self);
    //     }
    // });
    // await this.socket.on('newPlayer', function (playerInfo) {
    //     self.addOtherPlayers()
    // });
}
function update(){
    // console.log("update world")
    // for (var i = this.game.snakes.length - 1 ; i >= 0 ; i--) {
    //     this.game.snakes[i].update();
    //
    // }
    // for (var i = this.foodGroup.children.length - 1 ; i >= 0 ; i--) {
    //
    //     var f = this.foodGroup.children[i];
    //     f.food.update();
    // }
}
// Game.prototype = {
//     preload: function() {
//         console.log("preload")
//         //load assets
//         this.game.load.image('circle','asset/circle.png');
//     	this.game.load.image('shadow', 'asset/white-shadow.png');
//     	this.game.load.image('background', 'asset/tile.png');
//         this.game.load.image("border" , "asset/border.png")
//     	this.game.load.image('eye-white', 'asset/eye-white.png');
//     	this.game.load.image('eye-black', 'asset/eye-black.png');
//
//         this.game.load.image('food', 'asset/hex.png');
//     },
//     create: async function() {
//         var width = this.game.width;
//         var height = this.game.height;
//         this.socket=  this.game.socket;
//         this.game.world.setBounds(-width, -height, width*2, height*2);
//     	this.game.stage.backgroundColor = '#444';
//
//         //add tilesprite background
//         var background = this.game.add.tileSprite(-width, -height,
//             this.game.world.width, this.game.world.height, 'background');
//         this.game.add.tileSprite(-width , -height , this.game.world.width , 20 , "border")
//         this.game.add.tileSprite(-width , -height , 20 , this.game.world.height , "border")
//         this.game.add.tileSprite(width , height , -this.game.world.width , -20 , "border")
//         this.game.add.tileSprite(width , height , -20 , -this.game.world.height , "border")
//         //initialize physics and groups
//         this.game.physics.startSystem(Phaser.Physics.P2JS);
//         this.foodGroup = this.game.add.group();
//         this.snakeHeadCollisionGroup = this.game.physics.p2.createCollisionGroup();
//         this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();
//
//         //add food randomly
//         for (var i = 0 ; i < 12 ; i++) {
//             this.initFood(Util.randomInt(-width, width), Util.randomInt(-height, height));
//         }
//
//         this.game.snakes = [];
//         this.players = this.game.add.group();
//         const self = this;
//         this.addPlayer = ()=>{
//             console.log(this.foodGroup)
//             var snake = new PlayerSnake(this.game, 'circle', 0, 0,this.foodGroup,this.foodCollisionGroup,this.snakeHeadCollisionGroup);
//             this.game.camera.follow(snake.head);
//         }
//         this.addOtherPlayers = (playerInfo)=>{
//             var snake = new otherPlayers(this.game , "circle" , playerInfo.x , playerInfo.y);
//
//         }
//
//         await this.socket.on('currentPlayers', function (players) {
//             Object.keys(players).forEach(function (id) {
//                 console.log(players , id)
//                 if (players[id].playerId === self.socket.id) {
//                     self.addPlayer()
//                 }
//                 else{
//                     self.addOtherPlayers(players[id])
//                 }
//             });
//             for (var i = 0 ; i < self.game.snakes.length ; i++) {
//                 var snake = self.game.snakes[i];
//                 console.log(snake , "snakeee")
//                 snake.head.body.setCollisionGroup(self.snakeHeadCollisionGroup);
//                 snake.head.body.collides([self.foodCollisionGroup]);
//                 //callback for when a snake is destroyed
//                 snake.addDestroyedCallback(self.snakeDestroyed, self);
//             }
//         });
//         await this.socket.on('newPlayer', function (playerInfo) {
//             self.addOtherPlayers()
//         });
//
//         // var snake = new PlayerSnake(this.game, 'circle', 0, 0,this.foodGroup,this.foodCollisionGroup,this.snakeHeadCollisionGroup);
//         // this.game.camera.follow(snake.head);
//
//
//         //create bots
//         //initialize snake groups and collision
//
//     },
//     /**
//      * Main update loop
//      */
//
//     update: function() {
//         //update game components
//         console.log("update world")
//         for (var i = this.game.snakes.length - 1 ; i >= 0 ; i--) {
//             this.game.snakes[i].update();
//
//         }
//         for (var i = this.foodGroup.children.length - 1 ; i >= 0 ; i--) {
//
//             var f = this.foodGroup.children[i];
//             f.food.update();
//         }
//     },
//     /**
//      * Create a piece of food at a point
//      * @param  {number} x x-coordinate
//      * @param  {number} y y-coordinate
//      * @return {Food}   food object created
//      */
//     initFood: function(x, y) {
//         var f = new Food(this.game, x, y);
//         f.sprite.body.setCollisionGroup(this.foodCollisionGroup);
//         this.foodGroup.add(f.sprite);
//         f.sprite.body.collides([this.snakeHeadCollisionGroup]);
//
//         return f;
//     },
//     snakeDestroyed: function(snake) {
//         //place food where snake was destroyed
//         for (var i = 0 ; i < snake.headPath.length ;
//         i += Math.round(snake.headPath.length / snake.snakeLength) * 2) {
//             this.initFood(
//                 snake.headPath[i].x + Util.randomInt(-10,10),
//                 snake.headPath[i].y + Util.randomInt(-10,10)
//             );
//         }
//     }
// };
