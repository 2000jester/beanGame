var flag = function(x, y, w, h, r, colour) {

	this.xPos = x;
	this.yPos = y;
	this.width = w;
	this.height = h;
	this.radius = r;
	this.taken = false;
	this.colour = colour;
	this.startX = x;
	this.startY = y;

	this.flagImage = document.createElement('img');
	this.flagImage.src = (this.colour == "green" ? "Images/greenFlag.png" : "Images/redFlag.png");
}

flag.prototype.update = function() {

	if (this.colour == "green") {
		if (Player1.alive == false) {
			if (this.taken == true) {
				this.xPos = Player1.xPos
				this.yPos = Player1.yPos
				this.taken = false
			}
		}
	}
	if (this.colour == "red") {
		if (Player2.alive == false) {
			if (this.taken == true) {
				this.xPos = Player2.xPos
				this.yPos = Player2.yPos
				this.taken = false
			}
		}
	}

	this.draw();

	if (this.colour == "red") {
		var dx = this.xPos - Player2.xPos;
		var dy = this.yPos - Player2.yPos;
		var distance = Math.sqrt(dx * dx + dy * dy)

		if (distance < this.radius + Player2.radius && Player2.alive == true) {
			this.taken = true
		}
	} else if (this.colour == "green") {
		var dx = this.xPos - Player1.xPos;
		var dy = this.yPos - Player1.yPos;
		var distance = Math.sqrt(dx * dx + dy * dy)

		if (distance < this.radius + Player1.radius && Player1.alive == true) {
			this.taken = true
		}
	}

}

flag.prototype.draw = function() {
	if (this.taken == false) {
		context.drawImage(this.flagImage, this.xPos - (this.width / 2), this.yPos - (this.height / 2), this.width, this.height);
	}
	if (this.taken == true) {
		if (this.colour == "green") {
			context.fillStyle = "maroon"
			context.fillRect(150, 2, 40, 32)
			context.drawImage(this.flagImage, 155, 8, 30, 20);
		} else if (this.colour == "red") {
			context.fillStyle = "limegreen"
			context.fillRect(canvas.width - 190, 3, 40, 33)
			context.drawImage(this.flagImage, canvas.width - 185, 9, 30, 20);
		}
	}
}