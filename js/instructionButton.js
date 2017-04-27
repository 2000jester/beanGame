var instructionButton = function(){

this.xPos = 725;
this.yPos = 700;

this.width = 510;
this.height = 136;

this.rot = 0;

this.sprite = new Sprite("Images/instructionsUnClicked.png");
this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);

}

instructionButton.prototype.update = function(){
	
	if(MouseX > (this.xPos - 260) && MouseX < (this.xPos + 260) && MouseY > (this.yPos - 68) && MouseY < (this.yPos + 68)){
	
	this.sprite = new Sprite("Images/instructionsClicked.png");
	this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);
	
	} else {
		
	this.sprite = new Sprite("Images/instructionsUnClicked.png");
	this.sprite.buildAnimation(1, 1, 510, 136, 1, [0]);	
	
	}

	if(MouseX > (this.xPos - 260) && MouseX < (this.xPos + 260) && MouseY > (this.yPos - 68) && MouseY < (this.yPos + 68)){
	
		if(mouse.IsButtonPressed(mouse.BUTTON_LEFT)){
		
			gameState = STATE_INSTRUCTION;
		
		}
	
	}
}

instructionButton.prototype.draw = function(){

this.sprite.draw(context, this.xPos, this.yPos, this.width, this.height, this.rot);
	
}