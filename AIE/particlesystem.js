function random(min, max) {
	var num = Math.random();
	return min + (max - min) * num;
}

var Particle = function() {
	this.position = new Vec2();
	this.size = new Vec2();

	this.velocity = new Vec2();
	this.acceleration = new Vec2();

	this.rotation = 0;
	this.life = 0;

	this.alpha = 0;
}

var Emitter = function(imageFilename, positionX, positionY) {
	this.particles = [];
	this.elapsedEmittionTime = 0;

	this.texture = document.createElement("img");
	this.texture.src = imageFilename;

	this.position = new Vec2(positionX, positionY);

	this.emissionSize = new Vec2(5, 5);
	this.emissionRate = 1000;

	this.minLife = 0.5;
	this.maxLife = 3;
	this.minSize = 8;
	this.maxSize = 32;
	this.minVelocity = new Vec2(-50, -50);
	this.maxVelocity = new Vec2(50, 50);
	this.gravity = 0;
	this.wind = 0;
	this.transparency = 0.25;
}

Emitter.prototype.update = function(dt) {
	this.elapsedEmittionTime += dt;

	while (this.elapsedEmittionTime > (1.0 / this.emissionRate)) {
		this.spawnParticle();
		this.elapsedEmittionTime -= (1.0 / this.emissionRate);
	}

	for (var i = this.particles.length - 1; i >= 0; i--) {
		var p = this.particles[i];

		p.life -= dt;
		if (p.life <= 0.0)
			this.particles.splice(i, 1);

		p.acceleration.y += this.gravity * dt;
		p.acceleration.x += this.wind * dt;

		p.velocity.x += p.acceleration.x * dt;
		p.velocity.y += p.acceleration.y;

		p.position.x += p.velocity.x * dt;
		p.position.y -= p.velocity.y * dt;

		if (p.life <= 1.0)
			p.alpha = p.life * this.transparency;
	}
}

Emitter.prototype.draw = function() {
	var origin = new Vec2(this.texture.width / 2, this.texture.height / 2);

	for (var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];

		var scale = new Vec2(p.size.x / this.texture.width, p.size.y / this.texture.height);

		context.save();
		context.translate(p.position.x, p.position.y);
		context.rotate(p.rotation);
		context.globalAlpha = p.alpha;
		context.drawImage(this.texture, origin.x * scale.x, origin.y * scale.y, p.size.x, p.size.y);
		context.restore();
	}
}

Emitter.prototype.spawnParticle = function() {
	var p = new Particle();

	p.life = random(this.minLife, this.maxLife);
	p.rotation = 0;
	p.acceleration = new Vec2(this.wind, -this.gravity);
	p.velocity = new Vec2(
		random(this.minVelocity.x, this.maxVelocity.x),
		random(this.minVelocity.y, this.maxVelocity.y));

	p.position = new Vec2(
		random(-this.emissionSize.x / 2, this.emissionSize.x / 2) + this.position.x,
		random(-this.emissionSize.y / 2, -this.emissionSize.y / 2) + this.position.y);

	p.size = new Vec2(random(this.minSize, this.maxSize), random(this.minSize, this.maxSize));

	p.alpha = this.transparency;

	this.particles.push(p);
}

function createBurstEmitter(particleTexture, posX, posY) {
	var emitter = new Emitter(particleTexture, posX, posY);
	return emitter;
}

function createFireEmitter(particleTexture, posX, posY) {
	var e = new Emitter(particleTexture, posX, posY);
	e.gravity = 0.0;

	e.minLife = 0.25;
	e.maxLife = 2.0;

	e.minVelocity = new Vec2(0.0, 0.0);
	e.maxVelocity = new Vec2(0.0, 100.0);

	e.emissionRate = 1000.0;

	e.emissionSize = new Vec2(10.0, 1.0);
	e.transparency = 0.15;

	return e;
}

function createFlyingStarsEmitter(particleTexture, posX, posY) {
	var e = new Emitter(particleTexture, posX, posY);
	e.emissionSize = new Vec2(SCREEN_WIDTH / 2, 0);
	e.emissionRate = 100.0;
	e.minLife = 2.0;
	e.maxLife = 7.0;
	e.transparency = 0.20;
	e.minVelocity.x = 0.0;
	e.maxVelocity.x = 0.0;
	e.minVelocity.y = 75.0;
	e.maxVelocity.y = 100.0;
	e.transparency = 0.5;
	return e;
}