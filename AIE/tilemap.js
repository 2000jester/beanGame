
function Tilemap(levelData) {
	this.levelData = levelData;
	
	this.NUM_TILES_X = levelData.width;
	this.NUM_TILES_Y = levelData.height;
	
	this.TILE_WIDTH = levelData.tilewidth;
	this.TILE_HEIGHT = levelData.tileheight;
	
	for(var i=0; i<levelData.tilesets.length; i++)
	{
		let src = levelData.tilesets[i].image;
		if( src.lastIndexOf('/') >= 0 )
			src = src.substr( src.lastIndexOf('/') + 1 );
		
		levelData.tilesets[i].imageElement = document.createElement("img");
		levelData.tilesets[i].imageElement.src = "images/" + src;
	}
}

Tilemap.prototype.DrawAllLayers = function(context, xOffset, yOffset) {
	var level = this.levelData;
	for(var i=0; i<level.layers.length; i++)
	{
		this.DrawLayer(context, i, xOffset, yOffset);
	}
}

Tilemap.prototype.DrawLayer = function(context, layerId, xOffset, yOffset)
{
	var level = this.levelData;
	
	if( level.layers[layerId].visible == false )
		return;
	
	var tileset = level.tilesets[0];
	var tilesetImage = tileset.imageElement;
	
	var TILESET_MARGIN = tileset.margin;
	var TILESET_SPACING = tileset.spacing;
	var TILESET_COUNT_X = tileset.columns;
	var TILESET_WIDTH = tileset.tilewidth;
	var TILESET_HEIGHT = tileset.tileheight;
	
	var TILE_WIDTH = level.tilewidth;
	var TILE_HEIGHT = level.tileheight;
	
	var idx = 0;
	
	for( var y = 0; y < level.layers[layerId].height; y++ )
	{
		for( var x = 0; x < level.layers[layerId].width; x++ )
		{
			if( level.layers[layerId].data[idx] != 0 )
			{
				// the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
				// correct tile
				var tileIndex = level.layers[layerId].data[idx] - 1;
				var sx = TILESET_MARGIN + (tileIndex % TILESET_COUNT_X) * (TILESET_WIDTH + TILESET_SPACING);
				var sy = TILESET_MARGIN + (Math.floor(tileIndex / TILESET_COUNT_X)) * (TILESET_HEIGHT + TILESET_SPACING);
				
				context.drawImage(tilesetImage, 
					sx, sy, 
					TILESET_WIDTH, TILESET_HEIGHT, 
					x*TILE_WIDTH - xOffset, y*TILE_HEIGHT - yOffset, 
					TILESET_WIDTH, TILESET_HEIGHT);
			}
			idx++;
		}
	}
}

Tilemap.prototype.GetLayerId = function(layerName)
{
	var level = this.levelData;
	for(var i=0; i<level.layers.length; i++)
	{
		if( level.layers[i].name === layerName)
			return i;
	}
	
	return -1;
}

Tilemap.prototype.GetLayerById = function(layerId)
{
	return this.levelData.layers[layerId];
}

Tilemap.prototype.GetLayerByName = function(layerName)
{
	return this.GetLayerById( this.GetLayerId(layerName) );
}

Tilemap.prototype.GetPropertiesForTile = function(layerName, xIndex, yIndex){

	var layerId = this.GetLayerId(layerName);

	// invalid layer, return empty object, there are no properties
	// also print a debug statement to the console for the developer
	if( layerId < 0 )
	{
		console.error("No layer with name:" + layerName );
		return { };
	}

	var index = yIndex * this.NUM_TILES_X + xIndex;
	var tileIndex = this.levelData.layers[layerId].data[index];

	var properties = this.levelData.tilesets[0].tileproperties[tileIndex-1] || { };

	return properties;
}

Tilemap.prototype.IndexToPosition = function(xIndex, yIndex){

	return {
		x: xIndex * this.TILE_WIDTH + (this.TILE_WIDTH / 2),
		y: yIndex * this.TILE_HEIGHT + (this.TILE_HEIGHT / 2)
	};

}

Tilemap.prototype.PositionToIndex = function(xPos, yPos)
{
	return {
		x: Math.floor(xPos / this.TILE_WIDTH),
		y: Math.floor(yPos / this.TILE_HEIGHT)
	};
}

Tilemap.prototype.GetTileValue = function(layerName, xIndex, yIndex)
{
	var layerId = this.GetLayerId(layerName);
	if( layerId < 0 )
	{
		console.error("No layer with name:" + layerName );
		return -1;
	}

	if( xIndex < 0 || xIndex >= this.NUM_TILES_X || yIndex < 0 || yIndex >= this.NUM_TILES_Y )
	{
		// the specified tileIndex is out of range, return a negative value.
		return -1;
	}

	var index = yIndex * this.NUM_TILES_X + xIndex;

	return this.levelData.layers[layerId].data[index];
}

Tilemap.prototype.SetTileValue = function(layerName, xIndex, yIndex, newTileId)
{
	var layerId = this.GetLayerId(layerName);
	if( layerId < 0 )
	{
		console.error("No layer with name:" + layerName );
		return;
	}

	var index = yIndex * this.NUM_TILES_X + xIndex;
	this.levelData.layers[layerId].data[index] = newTileId;
}