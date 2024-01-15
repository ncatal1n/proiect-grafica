class Ball {
    constructor(x, y, radius, velocityX, velocityY, speed) {
      this.x = x;
      this.y = y;
      this.width = radius;
      this.height = radius;
      this.velocity = {
        "x" : velocityX,
        "y" : velocityY
      };
      this.speed = speed;
    }
  
    move() {
      this.x += this.velocity.x * this.speed;
      this.y += this.velocity.y * this.speed;
    }
  
}

export default Ball;