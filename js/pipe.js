function Pipe() {
  this.x = width;
  this.w = 70;
  this.h = Math.floor(Math.random() * height / 2 + height * 0.1);
  this.gap = height * 0.3;
  this.speed = 2;
  this.scored = false;
}

Pipe.prototype.update = function() {
  this.x -= this.speed;
};

Pipe.prototype.draw = function() {
  context.fillRect(this.x, 0, this.w, this.h);
  context.fillRect(this.x, this.h +  this.gap, this.w, height - this.h - this.gap);
};

Pipe.prototype.hits = function(blob) {
  return (this.x < blob.x + blob.r && blob.x - blob.r < this.x + this.w
    && (this.h > blob.y - blob.r || this.h + this.gap < blob.y + blob.r));
};
