var playButton = function(){

this.xPos = 725;
this.yPos = 500;

this.width = 510;
this.height = 136;

this.rot = 0;

this.sprite = new Sprite("Images/playUnClicked.png");
this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);

}

playButton.prototype.update = function(){
	
	if(MouseX > (this.xPos - 260) && MouseX < (this.xPos + 260) && MouseY > (this.yPos - 68) && MouseY < (this.yPos + 68)){
	
	this.sprite = new Sprite("Images/playClicked.png");
	this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);
	
	} else {
		
	this.sprite = new Sprite("Images/playUnClicked.png");
	this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);	
	
	}

	if(MouseX > (this.xPos - 260) && MouseX < (this.xPos + 260) && MouseY > (this.yPos - 68) && MouseY < (this.yPos + 68)){
	
		if(mouse.IsButtonPressed(mouse.BUTTON_LEFT)){
		
			gameState = STATE_GAME;
		
		}
	
	}
}

playButton.prototype.draw = function(){

this.sprite.draw(context, this.xPos, this.yPos, this.width, this.height, this.rot);
	
}