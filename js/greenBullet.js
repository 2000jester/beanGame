var greenBullet = function(pxPos, pyPos) {

	this.alive = true;

	this.xPos = pxPos;
	this.yPos = pyPos;
	this.width = 10;
	this.height = 10;
	this.rot = 0;
	this.dir;
	this.bulletSpeed = 7;
	this.radius = 5;

	if (Player2.sprite.currentAnimation == ANIM_IDLE) {
		this.dir = 0;
	} else if (Player2.sprite.currentAnimation == ANIM_WALK_UP) {
		this.dir = 1;
	} else if (Player2.sprite.currentAnimation == ANIM_WALK_DOWN) {
		this.dir = 2;
	} else if (Player2.sprite.currentAnimation == ANIM_WALK_LEFT) {
		this.dir = 3;
	} else if (Player2.sprite.currentAnimation == ANIM_WALK_RIGHT) {
		this.dir = 4;
	}

	this.sprite = new Sprite("Images/greenBullet.png");
	this.sprite.buildAnimation(1, 1, 40, 40, 1, [0]);

}

greenBullet.prototype.update = function() {

	//console.log(this.dir)

	if ((this.xPos < canvas.width - canvas.width) || (this.xPos > canvas.width) || (this.yPos > canvas.height) || (this.yPos < canvas.height - canvas.height)) {

		this.alive = false

	}

	//console.log(this.dir)
	if (this.dir == 1) {

		this.yPos = this.yPos - this.bulletSpeed

	} else if (this.dir == 2) {

		this.yPos = this.yPos + this.bulletSpeed

	} else if (this.dir == 3) {

		this.xPos = this.xPos - this.bulletSpeed

	} else if (this.dir == 4) {

		this.xPos = this.xPos + this.bulletSpeed

	} else {

		this.xPos = Player2.xPos
		this.yPos = Player2.yPos

	}

	//console.log(this.xPos)
	//console.log(this.yPos)

}

greenBullet.prototype.draw = function() {

	this.sprite.draw(context, this.xPos, this.yPos, this.width, this.height, this.rot);

}

greenBullet.prototype.collide = function() {

	/*if(this.xPos - 5 > Player1.xPos + 30 && this.xPos + 5 < Player1.xPos - 30 ){
		
		if(this.yPos + 5 > Player1.yPos - 30 && this.yPos - 5 < Player1.yPos + 30){
		
	//this.alive = false;
	console.log("test")
	
		}
	
	}
	
	if(((this.xPos + 5 > Player1.xPos) && (this.yPos > Player1.yPos)) && 
	((this.xPos > Player1.xPos) && (this.yPos < Player1.yPos + 30)) &&
	((this.xPos < Player1.xPos + 30) && (this.yPos > Player1.yPos)) &&
	((this.xPos < Player1.xPos + 30) && (this.yPos < Player1.yPos + 30))){
	
	//this.alive = false
	console.log("test")
	}	
	*/

	var dx = this.xPos - Player1.xPos;
	var dy = this.yPos - Player1.yPos;
	var distance = Math.sqrt(dx * dx + dy * dy)

	if (distance < this.radius + Player1.radius) {

		this.alive = false;
		Player1.health = Player1.health - 1
		Vars.lastDeath = Date.now() + Vars.deathTimer

		//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

	}

	if (Level.collision(this.xPos, this.yPos, this.radius)) {
		this.alive = false
	}
}