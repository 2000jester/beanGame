var STATE_ROT = 0;

var powerUp = function(x, y, w, h, r, type, animSpeed, name) {

	this.xPos = x;
	this.yPos = y;
	this.width = w;
	this.height = h;
	this.radius = r;
	this.type = type;
	this.animSpeed = animSpeed;
	this.name = name
	this.timer = 7000
	this.last = 0

	if (this.type == "health") {
		this.sprite = new Sprite("Images/health.png");
		this.sprite.buildAnimation(6, 3, 150, 150, this.animSpeed, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
	} else if (this.type == "speed") {
		this.sprite = new Sprite("Images/speed.png");
		this.sprite.buildAnimation(6, 3, 150, 150, this.animSpeed, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
	}
}

powerUp.prototype.update = function(deltaTime) {
	this.sprite.update(deltaTime)
	this.draw()
}

powerUp.prototype.draw = function() {
	this.sprite.draw(context, this.xPos, this.yPos, this.width, this.width)
		//context.fillStyle = "black"
		//context.fillRect(this.xPos, this.yPos, 2, 2)
}

powerUp.prototype.col = function(x, y, r) {

	var dx = this.xPos - x;
	var dy = this.yPos - y;
	var distance = Math.sqrt(dx * dx + dy * dy)

	if (distance < this.radius + r) {
		return true
	}
	return false
}