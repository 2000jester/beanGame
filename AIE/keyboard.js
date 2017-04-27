var Keyboard = function()
{
	var self = this;
	
	window.addEventListener('keydown', function(evt) { self.onKeyDown(evt); }, false);
	window.addEventListener('keyup', function(evt) { self.onKeyUp(evt); }, false);
	
	this.keyListeners = new Array();
	this.keys = new Array();
	
	// Key constants. Go here for a list of key codes:
	// https://developer.mozilla.org/en-US/docs/DOM/KeyboardEvent
	this.KEY_SPACE = 32;
	this.KEY_LEFT = 37;
	this.KEY_UP = 38;
	this.KEY_RIGHT = 39;
	this.KEY_DOWN = 40;
	this.KEY_A = 65;
	this.KEY_D = 68;
	this.KEY_S = 83;
	this.KEY_W = 87;
	this.KEY_SHIFT = 16;
	this.KEY_ENTER = 13;
	this.KEY_P = 80;
	this.KEY_PLUS = 187;
	this.KEY_MINUS = 189;
	this.KEY_PLUSTWO = 107;
	this.KEY_MINUSTWO = 109;
	this.KEY_RIGHTCONTROL = 17;
	this.KEY_NUMZERO = 96;
	
};

Keyboard.prototype.onKeyDown = function(evt) {
	this.keys[evt.keyCode] = true;
}

Keyboard.prototype.onKeyUp = function(evt) {
	this.keys[evt.keyCode] = false;
}

Keyboard.prototype.isKeyDown = function(keyCode) {
	return this.keys[keyCode];
}

window.keyboard = new Keyboard();