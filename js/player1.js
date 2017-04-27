	var ANIM_WALK_UPP = 0
	var ANIM_WALK_DOWNP = 1
	var ANIM_WALK_LEFTP = 2
	var ANIM_WALK_RIGHTP = 3
	var ANIM_IDLEP = 4

	var player1 = function() {

		this.xPos
		this.yPos
		this.rot
		this.radius = 30
		this.fireRate = 350
		this.health = 5
		this.col = false
		this.alive = true

		this.health = 5
		this.speed = 4 //2
		this.width = 80
		this.height = 80
		this.speeded = false
		this.speedTimer = 7000
		this.lastSpeed = 0
		this.a = 4000
		this.b = 0

		this.previousXPos = 0
		this.previousYPos = 0

		this.buildInterval = 0.15
		this.healthTimerOne = 4000
		this.healthOneLast = 0

		this.sprite = new Sprite("Images/redBeanSprite.png")
		this.sprite.buildAnimation(5, 6, 200, 200, this.buildInterval, [0, 5, 10, 15, 20, 25])
		this.sprite.buildAnimation(5, 6, 200, 200, this.buildInterval, [1, 6, 11, 16, 21, 26])
		this.sprite.buildAnimation(5, 6, 200, 200, this.buildInterval, [2, 7, 12, 17, 22, 27])
		this.sprite.buildAnimation(5, 6, 200, 200, this.buildInterval, [3, 8, 13, 18, 23, 28])
		this.sprite.buildAnimation(5, 6, 200, 200, 0.3, [4, 9, 14, 19, 24, 29])

	}

	player1.prototype.update = function(deltaTime) {

		if (Date.now() > this.b) {
			this.speed = 4
		}

		this.sprite.update(deltaTime)

		if (this.alive == true) {

			if (keyboard.isKeyDown(keyboard.KEY_W)) {

				if (this.sprite.currentAnimation != ANIM_WALK_UPP) {

					this.sprite.setAnimation(ANIM_WALK_UPP)

				}

				if (this.yPos - this.radius > canvas.height - canvas.height) {
					this.yPos = this.yPos - 1 * this.speed
				}

			} else if (keyboard.isKeyDown(keyboard.KEY_S)) {

				if (this.sprite.currentAnimation != ANIM_WALK_DOWNP) {

					this.sprite.setAnimation(ANIM_WALK_DOWNP)

				}

				if (this.yPos + this.radius < canvas.height) {
					this.yPos = this.yPos + 1 * this.speed
				}

			} else if (keyboard.isKeyDown(keyboard.KEY_A)) {

				if (this.sprite.currentAnimation != ANIM_WALK_LEFTP) {

					this.sprite.setAnimation(ANIM_WALK_LEFTP)

				}

				if (this.xPos - this.radius > canvas.width - canvas.width) {
					this.xPos = this.xPos - 1 * this.speed
				}

			} else if (keyboard.isKeyDown(keyboard.KEY_D)) {

				if (this.sprite.currentAnimation != ANIM_WALK_RIGHTP) {

					this.sprite.setAnimation(ANIM_WALK_RIGHTP)

				}

				if (this.xPos + this.radius < canvas.width) {
					this.xPos = this.xPos + 1 * this.speed
				}

			} else {

				if (this.sprite.currentAnimation != ANIM_IDLEP) {

					this.sprite.setAnimation(ANIM_IDLEP)

				}

			}
		}
		/*for (i = 0; i < Level.layers[1].cells.length; i++) {
			if (Level.layers[1].cells[i] instanceof cell) {
				if (this.x + this.width == Level.layers[1].cells[i].x && this.y + this.height == Level.layers[1].cells[i].y) {
					this.col = true
				}
			}
		}*/

		if (Level.collision(this.xPos, this.yPos, this.radius)) {
			this.col = true
		}

		if (this.col == true) {
			this.xPos = this.previousXPos
			this.yPos = this.previousyPos
		}

		this.previousXPos = this.xPos
		this.previousyPos = this.yPos

		this.col = false

		this.draw()

	}

	player1.prototype.draw = function() {
		if (this.alive == true) {
			this.sprite.draw(context, this.xPos, this.yPos, this.width, this.height, this.rot)
		}
	}