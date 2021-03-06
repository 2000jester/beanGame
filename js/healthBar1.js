var HEALTH_5 = 0;
var HEALTH_4 = 1;
var HEALTH_3 = 2;
var HEALTH_2 = 3;
var HEALTH_1 = 4;

var healthBar1 = function() {

	this.xPos = 75;
	this.yPos = 19;

	this.width = 200;
	this.height = 50;
	this.rot = 0;

	this.sprite = new Sprite("Images/letfhealth.png");
	this.sprite.buildAnimation(5, 1, 200, 50, 1, [0]); //5
	this.sprite.buildAnimation(5, 1, 200, 50, 1, [1]); //4
	this.sprite.buildAnimation(5, 1, 200, 50, 1, [2]); //3
	this.sprite.buildAnimation(5, 1, 200, 50, 1, [3]); //2
	this.sprite.buildAnimation(5, 1, 200, 50, 1, [4]); //1

}

healthBar1.prototype.update = function(deltaTime) {

	if (Player1.health == 5) {

		if (this.sprite.currentAnimation != HEALTH_5) {

			this.sprite.setAnimation(HEALTH_5)

		}
	} else if (Player1.health == 4) {

		if (this.sprite.currentAnimation != HEALTH_4) {

			this.sprite.setAnimation(HEALTH_4)
		}
	} else if (Player1.health == 3) {

		if (this.sprite.currentAnimation != HEALTH_3) {

			this.sprite.setAnimation(HEALTH_3)
		}
	} else if (Player1.health == 2) {

		if (this.sprite.currentAnimation != HEALTH_2) {

			this.sprite.setAnimation(HEALTH_2)
		}
	} else if (Player1.health == 1) {

		if (this.sprite.currentAnimation != HEALTH_1) {

			this.sprite.setAnimation(HEALTH_1)
		}
	}
}

healthBar1.prototype.draw = function(deltaTime) {

	this.sprite.draw(context, this.xPos, this.yPos, this.width, this.height, this.rot);

}