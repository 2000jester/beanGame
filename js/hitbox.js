var hitbox = function(colour) {
	this.colour = colour
	if (this.colour == "red") {
		this.width = 90
		this.height = 90
		this.x = 0
		this.y = (canvas.height / 2) - ((this.height / 2) - 3)
		this.radius = 45
	} else if (this.colour == "green") {
		this.width = 90
		this.height = 90
		this.x = canvas.width - (this.width - (this.width / 2))
		this.y = (canvas.height / 2) - ((this.height / 2) - 3)
		this.radius = 45
	}
}

hitbox.prototype.update = function() {
	this.draw()
}

hitbox.prototype.draw = function() {
	if (this.colour == "green") {
		context.fillStyle = "limegreen"
		context.fillRect(this.x - (this.width / 2), this.y, this.width, this.height)
	} else if (this.colour == "red") {
		context.fillStyle = "maroon"
		context.fillRect(this.x, this.y, this.width, this.height)
	}
}

hitbox.prototype.col = function(x, y, r) {
	var dx = this.x - x;
	var dy = this.y - y;
	var distance = Math.sqrt(dx * dx + dy * dy)

	if (distance < this.radius + r) {
		return true
	}
	return false
}