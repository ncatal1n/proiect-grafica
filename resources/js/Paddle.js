class Paddle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.velocity = 0;
    this.targetX = x; // 
    this.smoothing = 0.2; 
  }

  moveLeft() {
    this.targetX = Math.max(0, this.x - this.width); 
    this.velocity = -this.speed;
  }

  moveRight() {
    this.targetX = Math.min(this.x + this.width, this.x + this.width * 2); 
    this.velocity = this.speed;
  }

  updatePosition(canvasWidth) {
    this.x = this.lerp(this.x, this.targetX, this.smoothing);
    this.x = Math.max(0, Math.min(canvasWidth - this.width, this.x));
  }

  lerp(start, end, t) {
    return start + t * (end - start);
  }
}

export default Paddle;
