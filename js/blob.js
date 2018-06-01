function Blob() {
  this.x = width * 0.2;
  this.y = height / 2;
  this.r = 10;

  this.gravity = 0.4;
  this.velocity = 0;
}

Blob.prototype.update = function() {
  this.velocity += this.gravity;
  this.y += this.velocity;
  if (this.y + this.r > height) {
    this.y = height - this.r;
  }
};

Blob.prototype.draw = function() {
  context.beginPath();
  context.fillStyle = 'white';
  drawCircle(this.x, this.y, this.r);
};

Blob.prototype.fly = function() {
  this.velocity = -6;
};
