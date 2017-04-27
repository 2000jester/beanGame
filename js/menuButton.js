var menuButton = function() {

	this.xPos = 200;
	this.yPos = 770;

	this.width = 300;
	this.height = 80;

	this.rot = 0;

	this.sprite = new Sprite("Images/menuUnClicked.png");
	this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);

}

menuButton.prototype.update = function() {

	if (MouseX > (this.xPos - 150) && MouseX < (this.xPos + 150) && MouseY > (this.yPos - 40) && MouseY < (this.yPos + 40)) {

		this.sprite = new Sprite("Images/menuClicked.png");
		this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);

	} else {

		this.sprite = new Sprite("Images/menuUnClicked.png");
		this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);

	}

	if (MouseX > (this.xPos - 150) && MouseX < (this.xPos + 150) && MouseY > (this.yPos - 40) && MouseY < (this.yPos + 40)) {

		if (mouse.IsButtonPressed(mouse.BUTTON_LEFT)) {

			//gameState = STATE_MENU;
			//initialise();
			location.reload();
		}

	}
}

menuButton.prototype.draw = function() {

	this.sprite.draw(context, this.xPos, this.yPos, this.width, this.height, this.rot);

}