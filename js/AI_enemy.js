var STATE_IDLE = 0;
var STATE_CHASE = 1;

var enemy_state = STATE_IDLE;

var enemy = function(x, y, w, h) {
	this.xPos = x;
	this.yPos = y;

	this.health = 2;
	this.alive = true;
	this.width = w;
	this.height = h;
	this.direction = new Vec2(0, -1);
	this.radius = 13
	var bestInd = -1
	this.timer = 1700
	this.lastTime = 0
	this.speed = 150
	this.canKill = true

	this.pathFindTimer = 2;
	this.path = [];

	this.buildInterval = 0.15;

	this.sprite = new Sprite("Images/blueBean.png");
	this.sprite.buildAnimation(5, 6, 200, 200, this.buildInterval, [0, 5, 10, 15, 20, 25]);
	this.sprite.buildAnimation(5, 6, 200, 200, this.buildInterval, [1, 6, 11, 16, 21, 26]);
	this.sprite.buildAnimation(5, 6, 200, 200, this.buildInterval, [2, 7, 12, 17, 22, 27]);
	this.sprite.buildAnimation(5, 6, 200, 200, this.buildInterval, [3, 8, 13, 18, 23, 28]);

}

enemy.prototype.update = function(deltaTime) {
	var enemyPos = new Vec2(this.xPos, this.yPos);

	var playerPos = [];
	if (Player1.alive) playerPos.push(new Vec2(Player1.xPos, Player1.yPos));
	if (Player2.alive) playerPos.push(new Vec2(Player2.xPos, Player2.yPos));

	var bestInd = -1;
	var bestScoreSq = Number.MAX_SAFE_INTEGER;

	var currentDistSq = 0;
	for (var i = 0; i < playerPos.length; i++) {
		if ((currentDistSq = playerPos[i].subtract(enemyPos).sqrMag) < bestScoreSq) {
			bestScoreSq = currentDistSq;
			bestInd = i;
		}
	}

	if (bestInd < 0) return;

	//Calculate the displacement from the closest player
	var displacement = playerPos[bestInd].subtract(enemyPos);

	switch (enemy_state) {
		case STATE_IDLE:
			if (displacement.sqrMag < 300 * 300)
				enemy_state = STATE_CHASE;

			break;

		case STATE_CHASE:
			if (displacement.sqrMag > 400 * 400) {
				enemy_state = STATE_IDLE;
				this.path = [];
				break;
			}

			//Add onto the path finders timer
			this.pathFindTimer -= deltaTime;

			//Check if a new path should be found
			if (!this.path.length || this.pathFindTimer <= 0) {
				//Reset the timer
				this.pathFindTimer = 0.5;

				//Generate a new path
				this.path = pathGrid.navigateTo(playerPos[bestInd], enemyPos);
			}

			//Validate path
			while (this.path.length > 1) {
				//Get direction to the next node
				var dir1 = this.path[0].position.subtract(enemyPos).normalize();
				var dir2 = this.path[1].position.subtract(enemyPos).normalize();

				//Check the direction
				if (dir1.dot(dir2) < 0.1) this.path.splice(0, 1);
				else break;
			}

			//Check there is a path to follow
			if (this.path.length) {
				//Get the direction to the next node
				this.direction = this.path[0].position.subtract(enemyPos).normalize();

				//Get the movement
				var movement = this.direction.multi(this.speed * deltaTime);

				//Move the enemy
				this.xPos += movement.x;
				this.yPos += movement.y;

				//Update the animtions
				if (movement.x) this.sprite.setAnimation(movement.x < 0 ? ANIM_WALK_LEFT : ANIM_WALK_RIGHT);
				else this.sprite.setAnimation(movement.y < 0 ? ANIM_WALK_UP : ANIM_WALK_DOWN);
			}
			break;

	}

	if (this.canKill == true) {
		if (bestInd == 0) {
			var dx = this.xPos - Player1.xPos;
			var dy = this.yPos - Player1.yPos;
			var distance = Math.sqrt(dx * dx + dy * dy)

			if (distance < this.radius + Player1.radius) {

				this.alive = false;
				if (this.lastTime < Date.now()) {
					Player1.health = Player1.health - 1
					this.lastTime = Date.now() + this.timer
					Vars.lastDeath = Date.now() + Vars.deathTimer
					if (Player1.alive == false) {
						this.canKill = false
					}
				}
			}
		} else if (bestInd == 1) {
			var dx = this.xPos - Player2.xPos;
			var dy = this.yPos - Player2.yPos;
			var distance = Math.sqrt(dx * dx + dy * dy)

			if (distance < this.radius + Player2.radius) {
				if (this.lastTime < Date.now()) {
					Player2.health = Player2.health - 1
					this.lastTime = Date.now() + this.timer
					Vars.lastDeath = Date.now() + Vars.deathTimer
					if (Player2.alive == false) {
						this.canKill = false
					}
				}
			}
		}
	}

	this.sprite.update(deltaTime)

	this.draw()
}

enemy.prototype.draw = function() {
	/*
		 context.save();
		 context.translate(this.xPos, this.yPos);
		 context.rotate(Math.atan2(this.direction.y, this.direction.x));
		 context.scale(this.width, this.height);
		 //context.fillRect(-.5, -.5, 1, 1);
		 context.arc(this.xPos, this.yPos, 20, 0, 2 * Math.PI);
		 context.fill();
		 context.restore();
	*/
	/*context.fillStyle = "black"
	context.beginPath();
	context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
	context.fill();
	context.fillStyle = "white"
	context.beginPath();
	context.arc(this.xPos, this.yPos, 15, 0, Math.PI * 2, false);
	context.fill();*/

	this.sprite.draw(context, this.xPos, this.yPos, 80, 80)

}