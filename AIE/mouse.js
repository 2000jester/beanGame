function Mouse() {
	
	this.xPos = 0;
	this.yPos = 0;

	this.buttonDown = {};

	this.BUTTON_LEFT = 0;
	this.BUTTON_MIDDLE = 1;
	this.BUTTON_RIGHT = 2;
}


Mouse.prototype.Initialise = function(canvas) {
	var self = this;
	var context = canvas.getContext("2d");

	canvas.addEventListener("mousemove", function(evt){
		var rect = canvas.getBoundingClientRect();
		self.xPos = evt.x - rect.left;
		self.yPos = evt.y - rect.top;
	});

	canvas.addEventListener("mousedown", function(evt){
		self.buttonDown[evt.button] = true;
	});

	canvas.addEventListener("mouseup", function(evt){
		self.buttonDown[evt.button] = false;
	});

	
}

Mouse.prototype.GetX = function(){
	return this.xPos;
}

Mouse.prototype.GetY = function() {
	return this.yPos;
}

Mouse.prototype.IsButtonPressed = function(button){
	return this.buttonDown[button];
}

//var mouse = new Mouse();

