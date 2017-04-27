var wall = function(wx, wy, ww, wh){
	this.xPos = wx;
	this.yPos = wy;

	this.width = ww;
	this.height = wh;

}

wall.prototype.update = function(){
	this.draw()
}


wall.prototype.draw = function(){

	context.fillStyle= "black";
	context.fillRect(this.xPos, this.yPos, this.width, this.height);

}
