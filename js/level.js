var level = function(data, hitlayer) {
	this.layers = []
	this.hitmap = []
	this.spriteSheet = new Image();
	this.spriteSheet.src = data.tilesets[0].image;
	this.tileWidth = data.tilewidth;
	this.tileHeight = data.tileheight;
	this.mapWidth = data.width;
	this.mapHeight = data.height;

	for (i = 0; i < data.layers.length; i++) {
		this.layers[i] = new layer(data.layers[i].name)
		for (y = 0; y < data.layers[i].height; y++) {
			this.layers[i].cells[y] = []
			if (this.layers[i].name == hitlayer) {
				this.hitmap[y] = []
			}
			var idx = y * data.layers[i].width;

			for (x = 0; x < data.layers[i].width; x++) {
				var id = data.layers[i].data[idx]
				if (this.layers[i].name == hitlayer) {
					this.hitmap[y][x] = id != 0
				}
				if (id--) {
					this.layers[i].cells[y][x] = new cell()
					this.layers[i].cells[y][x].width = data.tilewidth;
					this.layers[i].cells[y][x].height = data.tileheight;
					this.layers[i].cells[y][x].sourceX = (id % data.tilesets[0].columns) * data.tilesets[0].tilewidth;
					this.layers[i].cells[y][x].sourceY = Math.floor(id / data.tilesets[0].columns) * data.tilesets[0].tileheight;
					this.layers[i].cells[y][x].sourceHeight = data.tilesets[0].tileheight;
					this.layers[i].cells[y][x].sourceWidth = data.tilesets[0].tilewidth;
					this.layers[i].cells[y][x].x = x * this.layers[i].cells[y][x].width
					this.layers[i].cells[y][x].y = y * this.layers[i].cells[y][x].height
				}
				idx++;
			}
		}
	}
}

var layer = function(name) {
	this.name = name
	this.cells = []
}

var cell = function() {
	this.x =
		this.y =
		this.width =
		this.height =
		this.sourceX =
		this.sourceY =
		this.sourceWidth =
		this.sourceHeight = 0;
}

level.prototype.draw = function(ctx) {
	for (i = 0; i < this.layers.length; i++) {
		for (y = 0; y < this.mapHeight; y++) {
			for (x = 0; x < this.mapWidth; x++) {
				if (this.layers[i].cells[y][x] instanceof cell) {
					ctx.drawImage(this.spriteSheet, this.layers[i].cells[y][x].sourceX, this.layers[i].cells[y][x].sourceY, this.layers[i].cells[y][x].sourceWidth, this.layers[i].cells[y][x].sourceHeight,
						this.layers[i].cells[y][x].x, this.layers[i].cells[y][x].y, this.layers[i].cells[y][x].width, this.layers[i].cells[y][x].height);
				}
			}
		}
	}
}

level.prototype.collision = function(x, y, r) {
	var position = new Vec2(x, y)
	var numPoint = 16
	var degrees = (Math.PI * 2) / numPoint
	var vector = new Vec2(1, 0).multiSet(r)

	for (i = 0; i < numPoint; i++) {
		var coordinate = this.converter(position.add(vector))
		vector.rotate(degrees)
		if (coordinate.x < 0 || coordinate.y < 0 || coordinate.x >= this.mapWidth || coordinate.y >= this.mapHeight) {
			return true
		}
		if (this.hitmap[coordinate.y][coordinate.x]) {
			return true
		}
	}
	return false
}

level.prototype.converter = function(worldPos) {
	return new Vec2(
		Math.floor((worldPos.x / (this.mapWidth * this.tileWidth)) * this.mapWidth),
		Math.floor((worldPos.y / (this.mapHeight * this.tileHeight)) * this.mapHeight));
}