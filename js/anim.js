function Anim (file, ext, startint, endint, fps) {
	this.imgs = []
	for (var value = startint, i = 0; value <= endint ; value++, i++) {
		this.imgs[i] = new Image()
		this.imgs[i].src = file + value + ext
	}

	this.frame = 0
	this.timer = 0
	this.fps = 1 / fps
}

Anim.prototype.Update = function(deltaTime) {
	this.timer += deltaTime
	while (this.timer >= this.fps) {
		this.frame = (this.frame + 1) % this.imgs.length;
		this.timer -= this.fps
	}
};

Anim.prototype.Draw = function(cxt, xPos, yPos, Width, Height) {
	cxt.drawImage(this.imgs[this.frame], xPos, yPos, Width, Height)
};