var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var mouse = new Mouse();
mouse.Initialise(canvas);

//------------------------------> DONT NOT EDIT ABOVE THIS <------------------------------

var Player1 = new player1();
var Player2 = new player2();
var PlayButton = new playButton();
var InstructionButton = new instructionButton();
var MenuButton = new menuButton();
var MenuButton1 = new menuButton();
var ResumeButton = new resumeButton();
var ResumePauseButton = new resumePauseButton();
var HealthBar1 = new healthBar1();
var HealthBar2 = new healthBar2();
var Enemy = new enemy(canvas.width / 2, canvas.height / 2, 50, 50);
var Level = new level(map, "walls")

var Vars = new vars();
var redFlag = new flag(45, (canvas.height / 2) + 2, 80, 60, 30, "red");
var greenFlag = new flag((canvas.width - 45), (canvas.height / 2) + 2, 80, 60, 30, "green");
var redBox = new hitbox("red");
var greenBox = new hitbox("green");
/*var healthOne = new powerUp(420 + 20, 210 + 20, 40, 40, 20, "health", 0.1);
var speedOne = new powerUp(420, (canvas.height - (210 - 20)), 40, 40, 20, "speed", 0.1);
var healthTwo = new powerUp((canvas.width - (420 - 20)), (canvas.height - (210 - 20)), 40, 40, 20, "health", 0.1);
var speedTwo = new powerUp((canvas.width - (420 - 20)), 210, 40, 40, 20, "speed", 0.1);*/

//Setup the pathfinding grid
var pathGrid = new Map(Level.mapWidth, Level.mapHeight, Level.tileWidth, Level.tileHeight);
for (var y = 0; y < Level.mapHeight; y++) {
for (var x = 0; x < Level.mapWidth; x++) {
		if (Level.hitmap[y][x])
			pathGrid.block(true, x * Level.tileWidth + Level.tileWidth / 2, y * Level.tileHeight + Level.tileHeight / 2);
	}
}
var tempPath = pathGrid.navigateTo(new Vec2(0, 0), new Vec2(50, 0));

var RB = new Anim("Images/Red/0", ".png", 181, 360, 50)
var GB = new Anim("Images/Green/0", ".png", 181, 360, 50)

var MouseX;
var MouseY;
var player1LastFire = 0;
var player2LastFire = 0;
var maxBullets = 5;
var whoWin = "bugged";

var background_image = document.createElement('img');
background_image.src = "Images/sandIMG.png";

var instruction_image = document.createElement('img');
instruction_image.src = "Images/Instructions2.png";

var menuBackground = document.createElement('img');
menuBackground.src = "Images/sandIMG.png";

var beanLogo = document.createElement('img');
beanLogo.src = "Images/beanLogo.png";

var fireEmitter = createFireEmitter("Images/fire.png", canvas.width - canvas.width + 25, canvas.height - canvas.height + 150);
var fireEmitter1 = createFireEmitter("Images/fire.png", canvas.width - 75, canvas.height - canvas.height + 150);

var bullets = [];
var bullets1 = [];
var walls = [];
var powerUps = [];

var backgroundMusic;
var shoot;
var powerSound;

function initialise() {

	Player1.xPos = 150;
	Player1.yPos = 425;
	Player2.xPos = 1300;
	Player2.yPos = 425;
	/*
		var one = 150

		//left top half
		walls.push(new wall(450,110,175,30))//1
		walls.push(new wall(450,110,30,150))//2

		//middle

		//left bottom half
		walls.push(new wall(450,canvas.height-(95+one),30,one))//2
		walls.push(new wall(450,canvas.height -125,175,30))//1
	*/
	powerUps.push(new powerUp(420 + 20, 210, 40, 40, 20, "health", 0.1, "h1"))
	powerUps.push(new powerUp((canvas.width - (420)), (canvas.height - (210 - 20)), 40, 40, 20, "health", 0.1, "h2"))

	powerUps.push(new powerUp(420 + 20, (canvas.height - (210 - 20)), 40, 40, 20, "speed", 0.1, "s1"))
	powerUps.push(new powerUp((canvas.width - (420)), 210, 40, 40, 20, "speed", 0.1, "s2"))

	backgroundMusic = new Howl({
		src: ["audio/menu.wav"],
		loop: true,
		buffer: true,
		volume: 0.5

	});
	backgroundMusic.play();

	shoot = new Howl({

		src: ["audio/Laser_Shoot.ogg"],
		buffer: true,
		volume: 1

	});

	powerSound = new Howl({
		src: ["audio/Powerup.ogg"],
		buffer: true,
		volume: 1
	});
}

function respawn(p) {
	if (p == "Player1" && (Date.now() > Vars.lastDeath)) {
		Player1.xPos = 150
		Player1.yPos = 425
		Player1.health = 5
		Player1.alive = true
		Enemy.canKill = true
	}
	if (p == "Player2" && (Date.now() > Vars.lastDeath)) {
		Player2.xPos = 1300;
		Player2.yPos = 425;
		Player2.health = 5;
		Player2.alive = true
		Enemy.canKill = true
	}
}

initialise();

var STATE_MENU = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var STATE_INSTRUCTION = 3;
var STATE_PAUSE = 4;

var gameState = STATE_MENU;

function runMenu(deltaTime) {

	//basicEnvironment();
	RB.Update(deltaTime)
	GB.Update(deltaTime)
	context.drawImage(menuBackground, 0, 0, canvas.width, canvas.height)

	context.drawImage(beanLogo, (canvas.width / 2) - 330, 20, 660, 400)

	PlayButton.update();
	PlayButton.draw();
	InstructionButton.update();
	InstructionButton.draw();

	fireEmitter.update(deltaTime);
	fireEmitter.draw(deltaTime);
	fireEmitter1.update(deltaTime);
	fireEmitter1.draw(deltaTime);

	RB.Draw(context, 70, 400, 320, 400)
	GB.Draw(context, canvas.width - (70 + 320), 400, 320, 400)
}

function runGame(deltaTime) {

	if (Player1.health < 1) {
		Player1.alive = false
	}
	if (Player2.health < 1) {
		Player2.alive = false
	}

	if (redBox.col(Player1.xPos, Player1.yPos, Player1.radius) && Player1.alive == true && greenFlag.taken == true) {
		Vars.redScore++;
		greenFlag.xPos = greenFlag.startX
		greenFlag.yPos = greenFlag.startY
		greenFlag.taken = false
	}

	if (greenBox.col(Player2.xPos, Player2.yPos, Player2.radius) && Player2.alive == true && redFlag.taken == true) {
		Vars.greenScore++;
		redFlag.xPos = redFlag.startX
		redFlag.yPos = redFlag.startY
		redFlag.taken = false
	}

	basicEnvironment();

	Enemy.update(deltaTime)

	for (i = 0; i < powerUps.length; i++) {
		powerUps[i].update(deltaTime)

		if (powerUps[i].col(Player1.xPos, Player1.yPos, Player1.radius) && Player1.alive == true && Date.now() > powerUps[i].last) {

			if (powerUps[i].type == "health") {

				Player1.health = 5
					//powerSound.play();
				powerUps[i].last = Date.now() + powerUps[i].timer

			} else if (powerUps[i].type == "speed" && Date.now() > powerUps[i].last && Date.now() > Player1.lastSpeed) {

				Player1.speed = 8
					//powerSound.play()
				Player1.lastSpeed = Date.now() + Player1.speedTimer
				Player1.b = Date.now() + Player1.a
			}
			//console.log(powerUps[i])
		}

		if (powerUps[i].col(Player2.xPos, Player2.yPos, Player2.radius) && Player2.alive == true && Date.now() > powerUps[i].last) {

			if (powerUps[i].type == "health") {

				Player2.health = 5
				powerUps[i].last = Date.now() + powerUps[i].timer

			} else if (powerUps[i].type == "speed" && Date.now() > powerUps[i].last && Date.now() > Player2.lastSpeed) {

				Player2.speed = 8
				Player2.lastSpeed = Date.now() + Player2.speedTimer
				Player2.b = Date.now() + Player2.a
			}
			//console.log(powerUps[i])
		}
	}

	for (i = 0; i < walls.length; i++) {
		//console.log(walls)
		walls[i].update()
	}

	for (var i = bullets1.length - 1; i >= 0; i = i - 1) {

		//console.log(bullets1[i].alive)

		if (!bullets1[i].alive) {

			bullets1.splice(i, 1)

			continue;
		}

		bullets1[i].collide();

		bullets1[i].update(deltaTime);

		bullets1[i].draw();

		//console.log(bullets1[i].xPos)

	}

	for (var i = bullets.length - 1; i >= 0; i = i - 1) {

		if (!bullets[i].alive) {

			bullets.splice(i, 1)

			continue;
		}

		bullets[i].collide();

		bullets[i].update(deltaTime);

		bullets[i].draw();

	}

	if (keyboard.isKeyDown(keyboard.KEY_SPACE) && Player1.sprite.currentAnimation != ANIM_IDLEP && (player1LastFire + Player1.fireRate < Date.now()) && bullets1.length < maxBullets && Player1.alive == true) {

		var temp = new redBullet(Player1.xPos, Player1.yPos);

		bullets1[bullets1.length] = temp;

		player1LastFire = Date.now();

		shoot.play();

	}

	if (keyboard.isKeyDown(keyboard.KEY_NUMZERO) && Player2.sprite.currentAnimation != ANIM_IDLE && (player2LastFire + Player2.fireRate < Date.now()) && bullets.length < maxBullets && Player1.alive == true) {

		var temp = new greenBullet(Player2.xPos, Player2.yPos);

		bullets[bullets.length] = temp;

		player2LastFire = Date.now();

		shoot.play();

	}
	//console.log(bullets1.length)

	Player1.update(deltaTime);
	Player2.update(deltaTime);

	//healthOne.update(deltaTime);
	//speedOne.update(deltaTime);
	//healthTwo.update(deltaTime);
	//speedTwo.update(deltaTime);

	greenFlag.update();
	redFlag.update();

	if (Player1.alive == true) {
		HealthBar1.update();
		HealthBar1.draw();
	}
	if (Player2.alive == true) {
		HealthBar2.update();
		HealthBar2.draw();
	}
	if (keyboard.isKeyDown(keyboard.KEY_P)) {

		gameState = STATE_PAUSE;

	}

	if (Vars.redScore == 3) {
		whoWin = "Player 1 Wins!"
		gameState = STATE_GAMEOVER
	} else if (Vars.greenScore == 3) {
		whoWin = "Player 2 Wins!"
		gameState = STATE_GAMEOVER
	}

	//TEMP
	if (keyboard.isKeyDown(16)) {
	for (var x = 0; x < pathGrid.width; x++) {
		for (var y = 0; y < pathGrid.height; y++) {
			var n = pathGrid.nodes[x][y];
			context.fillStyle = (n.block ? "red" : "blue");
			context.fillRect(n.position.x - 5, n.position.y - 5, 10, 10);
		}
	}
}
	//TEMP

	//////////////////////////////////////////////////////
	//
	//
	//
	//					PLAYER 1
	//
	//
	//
	//

	//if (healthOne.col(Player1.xPos, Player1.yPos, Player1.radius) && Player1.alive == true && (Date.now() > Player1.healthOneLast)) {
	//	Player1.health = 5
	//	Player1.healthOneLast = Date.now() + Player1.healthTimerOne

	//}

	/*if (healthTwo.col(Player1.xPos, Player1.yPos, Player1.radius) && Player1.alive == true && (Date.now() > healthOne.lastTime)) {
		Player1.health = 5
		healthOne.lastTime = Date.now() + healthOne.timer

	}

	if (speedOne.col(Player1.xPos, Player1.yPos, Player1.radius) && Player1.alive == true && (Date.now() > healthOne.lastTime)) {
		Player1.health = 5
		healthOne.lastTime = Date.now() + healthOne.timer

	}

	if (speedTwo.col(Player1.xPos, Player1.yPos, Player1.radius) && Player1.alive == true && (Date.now() > healthOne.lastTime)) {
		Player1.health = 5
		healthOne.lastTime = Date.now() + healthOne.timer

	}

	/*if (Player1.health == 0) {
		respawn("Player1")
	}
	if (Player2.health == 0) {
		respawn("Player2")
	}*/
	/*if (Player1.health == 0 || Player2.health == 0) {
		if (Player1.health == 0) {
			whoWin = "Player 2 Wins!"
		} else if (Player2.health == 0) {
			whoWin = "Player 1 Wins!"
		}
		gameState = STATE_GAMEOVER
	}*/

	//console.log(Player1.alive)
	//console.log(Player1.health)
	//console.log(lastDeath)

	if (Player1.alive == false) {
		respawn("Player1")
	}
	if (Player2.alive == false) {
		respawn("Player2")
	}
}

function runGameOver(deltaTime) {

	//context.fillStyle = "beige"
	//context.fillRect(0, 0, 1450, 850)
	context.drawImage(menuBackground, 0, 0, canvas.width, canvas.height)

	context.fillStyle = "red"
	context.font = "150px Cooper Black";
	context.fillText("Game Over", 300, 200);
	context.font = "100px Cooper Black";
	context.fillText(whoWin, 360, 400);

	MenuButton.update();
	MenuButton.draw();

	if (whoWin == "Player 1 Wins!") {
		RB.Update(deltaTime)
		RB.Draw(context, (canvas.width / 2) - (320 / 2), 450, 320, 400)
	} else if (whoWin == "Player 1 Wins!") {
		RB.Update(deltaTime)
		RB.Draw(context, (canvas.width / 2) - (320 / 2), 450, 320, 400)
	}

}

function runInstruction(deltaTime) {

	context.drawImage(instruction_image, 0, 0, canvas.width, canvas.height)

	MenuButton.update();
	MenuButton.draw();

}

function runPause(deltaTime) {

	context.fillStyle = "red"
	context.font = "60px Cooper Black";
	context.fillText("Paused", 620, 100);

	ResumeButton.update();
	ResumeButton.draw();

	MenuButton1.update();
	MenuButton1.draw();

}

function basicEnvironment() {
	//context.drawImage(background_image, 0, 0, canvas.width, canvas.height)

	/*for (var layer = 0; layer < map.layers.length;layer++) {
		//Calculate the maps scale
		var scales = new Vec2(map.layers[layer].width * map.tileWidth / canvas.width, map.layers[layer].height * map.tileHeight / canvas.height);
		context.save();
		context.scale(scales.x, scales.y);

		for (var y = 0; y < map.layers[layer].height; y++) {
			//Get the index for this tile coord
			var idx = y * map.layers[layer].width;

			for (var x = 0; x < map.layers[layer].width; x++) {
				//Get the tile ID
				var tileID = map.layers[layer].data[idx] - 1;

				//Check valid ID
				if (tileID) {
					//Get source
					var sx = (tileID % map.tilesets[0].columns) * map.tilesets[0].tilewidth;
					var sy = Math.floor(tileID / map.tilesets[0].columns) * map.tilesets[0].tileheight;

					//Render the img
					context.drawImage(tilesheet, sx, sy, map.tilesets[0].tilewidth, map.tilesets[0].tileheight, x * map.tilewidth, y * map.tileheight, map.tilewidth, map.tileheight);

					//if(map.layers[1].name == "walls"){
						//console.log("owo")
					//}
				}
				idx++;
			}
		}

		context.restore();
	}*/

	Level.draw(context);

	context.fillStyle = "black"
	context.font = "40px arial";
	if (Player1.alive == true) {
		context.fillText(Vars.redScore, 10, 70);
	}
	if (Player2.alive == true) {
		context.fillText(Vars.greenScore, canvas.width - 30, 70);
	}

	greenBox.update()
	redBox.update()

	/*var redBaseWidth = 90
	var redBaseHeight = 90
	var redBaseX = 0
	var redBaseY = (canvas.height / 2) - ((redBaseHeight / 2) - 3)
		//red base
	context.fillStyle = "maroon"
	context.fillRect(redBaseX, redBaseY, redBaseWidth, redBaseHeight)

	var greenBaseWidth = 90
	var greenBaseHeight = 90
	var greenBaseX = canvas.width - greenBaseWidth
	var greenBaseY = (canvas.height / 2) - ((greenBaseHeight / 2) - 3)
		//red base
	context.fillStyle = "limegreen"
	context.fillRect(greenBaseX, greenBaseY, greenBaseWidth, greenBaseHeight)
	*/
}

function run() {

	MouseX = mouse.GetX();
	MouseY = mouse.GetY();

	var deltaTime = getDeltaTime();

	switch (gameState) {
		case STATE_MENU:
			runMenu(deltaTime);
			break;
		case STATE_GAME:
			runGame(deltaTime);
			break;
		case STATE_GAMEOVER:
			runGameOver(deltaTime);
			break;
		case STATE_PAUSE:
			runPause(deltaTime);
			break;
		case STATE_INSTRUCTION:
			runInstruction(deltaTime);
			break;
	}

}

//------------------------------> DONT NOT EDIT BELLOW THIS <------------------------------

// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
	var onEachFrame;
	if (window.requestAnimationFrame) {
		onEachFrame = function(cb) {
			var _cb = function() {
				cb();
				window.requestAnimationFrame(_cb);
			}
			_cb();
		};
	} else if (window.mozRequestAnimationFrame) {
		onEachFrame = function(cb) {
			var _cb = function() {
				cb();
				window.mozRequestAnimationFrame(_cb);
			}
			_cb();
		};
	} else {
		onEachFrame = function(cb) {
			setInterval(cb, 1000 / 60);
		}
	}

	window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);