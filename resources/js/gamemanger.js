
import WebGlUtils from './webglutils.js';
import Ball from './Ball.js';
import {Paddle, AIPaddle} from './Paddle.js';
import Counter from './Counter.js';

class GameManager{
    constructor(canvas)
    {
        this.ctx = canvas.getContext('webgl');
        this.width = canvas.width;
        this.height = canvas.height;

        this.utils = new WebGlUtils(this.ctx, this.width, this.height);



        this.state = {
          "mode" : "stopped",
        };

        this.paddleHeight = 40;
        this.paddleWidth = 200;
        this.paddleComputerWidth = 100;

        this.ballSize = 20;

        this.ballSpeed = 0.6;
        this.paddleSpeed = 1;
        


        this.ball = new Ball(
          (this.width - this.ballSize) / 2,
          (this.height - this.ballSize) / 2,
          this.ballSize,
          5,
          5,
          this.ballSpeed
        );

        this.computer = new AIPaddle(
            (this.width - this.paddleWidth) / 2,
            0,
            this.paddleComputerWidth,
            this.paddleHeight,
            this.paddleSpeed,
            0.05
        );

        this.player = new Paddle(
            (this.width - this.paddleWidth) / 2,
            (this.height - this.paddleHeight),
            this.paddleWidth,
            this.paddleHeight,
            this.paddleSpeed
        );

        

        this.score = {
            "player" : 0,
            "computer" :0
        };

    }


    collision(rectA, rectB) {
      const prevRectA = {
        x: rectA.x - rectA.velocity.x,
        y: rectA.y - rectA.velocity.y,
        width: rectA.width,
        height: rectA.height,
      };
    
      const prevRectB = {
        x: rectB.x - rectB.velocity.x,
        y: rectB.y - rectB.velocity.y,
        width: rectB.width,
        height: rectB.height,
      };
    
      const isCollidingCurrent = (
        rectA.x < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y
      );
    
      const isCollidingPrevious = (
        prevRectA.x < prevRectB.x + prevRectB.width &&
        prevRectA.x + prevRectA.width > prevRectB.x &&
        prevRectA.y < prevRectB.y + prevRectB.height &&
        prevRectA.y + prevRectA.height > prevRectB.y
      );
    
      if (isCollidingCurrent || isCollidingPrevious) {
        // Handle collision response to prevent objects from getting stuck
        const overlapX = Math.min(rectA.x + rectA.width, rectB.x + rectB.width) - Math.max(rectA.x, rectB.x);
        const overlapY = Math.min(rectA.y + rectA.height, rectB.y + rectB.height) - Math.max(rectA.y, rectB.y);
    
        if (overlapX < overlapY) {
          // Adjust x-position
          const direction = rectA.x < rectB.x ? -1 : 1;
          rectA.x += overlapX * direction;
        } else {
          // Adjust y-position
          const direction = rectA.y < rectB.y ? -1 : 1;
          rectA.y += overlapY * direction;
        }
        
        return true; // Collision handled
      }
    
      return false; // No collision
    }
    


    drawCompPaddle()
    {
        this.utils.drawRectangle('#363333', this.computer.x, this.computer.y, this.computer.width, this.computer.height);

    }

    drawScore()
    {

      let playerCounter = new Counter(this.utils, {
        "x" : this.width - 100,
        "y" :this.height -200
      });

      let computerCounter = new Counter(this.utils,{
          "x" : 50,
          "y" :100
      });

      playerCounter.setCounter(this.score.player);
      playerCounter.update();
      playerCounter.draw();

      computerCounter.setCounter(this.score.computer);
      computerCounter.update();
      computerCounter.draw();



    }

    drawPaddle(){
        this.utils.drawRectangle('#363333', this.player.x, this.player.y, this.player.width, this.player.height);
    }

    drawBall()
    {
        this.utils.drawCircle('#ffffff', this.ball.x, this.ball.y, this.ballSize,30);
    }



    increaseDifficulty()
    {
      let factor = 5;
      this.player.width -= factor;
      this.computer.width += factor;
      this.computer.reactionSpeed = (this.computer.reactionSpeed) < 1.5 ? (this.computer.reactionSpeed+ (factor / 1000)) : this.computer.reactionSpeed;
      if(this.player.width <= 10)
      {
        this.state.mode = "gameover";
      }
      
    }



    draw()
    {
        //clear the screen
        this.utils.clear(this.width, this.height);

        this.player.updatePosition(this.width);
        this.computer.updatePosition(this.width);

        this.drawPaddle();
        this.drawCompPaddle();
        this.drawScore();

        this.drawBall();

    }


    update() {
        this.ball.move();
    
        if (this.ball.x < 0 || this.ball.x + this.ball.width > this.width) {
          this.ball.velocity.x = -this.ball.velocity.x;
        }
    
        if (this.ball.y < 0) {
          this.ball.velocity.y = -this.ball.velocity.y;
        }
    
        if (this.collision(this.ball, this.player)) {
          this.ball.speed = 1.5;
          this.ball.velocity.y = -this.ball.velocity.y; 
        }
    
        if (this.collision(this.ball, this.computer)) {
          this.ball.speed = 1.1;

          this.ball.velocity.y = -this.ball.velocity.y; 
        }
    
        if (this.ball.y + this.ball.height > this.height) {
          this.score.computer++;
          this.resetGame();
        } else if (this.ball.y < 0) {
          this.score.player++;
          this.resetGame();
        }

        this.computer.updateComputerPaddle(this.ball.x, this.width);
      }
    
      resetGame() {

        let paddleWidth = this.player.width;
        let compPaddleWidth = this.computer.width;
        let aiRactionSpeed = this.computer.reactionSpeed;

        this.ball = new Ball(
          (this.width - this.ballSize + (Math.ceil(Math.random(10, 100)))) / 2,
          (this.height - this.ballSize) / 2,
          this.ballSize,
          (Math.round(Math.random(0, 1)) == 0 ? 5 : -5),
          (Math.round(Math.random(0, 1)) == 0 ? 5 : -5),
          0.6
        );
  
        this.computer = new AIPaddle(
            (this.width - compPaddleWidth) / 2,
            0,
            compPaddleWidth,
            this.paddleHeight,
            this.paddleSpeed,
            aiRactionSpeed
        );
  
        this.player = new Paddle(
            (this.width - paddleWidth) / 2,
            (this.height - this.paddleHeight),
            paddleWidth,
            this.paddleHeight,
            this.paddleSpeed
        );
        this.increaseDifficulty();

      }

      handleInput() {
        document.addEventListener('keydown', (event) => {
          switch (event.key) {
            case 'ArrowLeft':
              this.player.moveLeft();
              break;
            case 'ArrowRight':
              this.player.moveRight();
              break;
            case 'Enter':
              this.state.mode = this.state.mode == "gameover" ? "gameover" :(this.state.mode == 'running' ? 'stopped' : 'running');
              break;
            case 'R':
            case 'r':
              this.restart();
              break;
          }
        });
      }


    restart()
    {
      this.score = {
        "player": 0,
        "computer": 0
      };
      this.ball = new Ball(
        (this.width - this.ballSize) / 2,
        (this.height - this.ballSize) / 2,
        this.ballSize,
        5,
        5,
        this.ballSpeed
      );

      this.computer = new AIPaddle(
          (this.width - this.paddleWidth) / 2,
          0,
          this.paddleComputerWidth,
          this.paddleHeight,
          this.paddleSpeed,
          0.05
      );

      this.player = new Paddle(
          (this.width - this.paddleWidth) / 2,
          (this.height - this.paddleHeight),
          this.paddleWidth,
          this.paddleHeight,
          this.paddleSpeed
      );
      this.resetGame();
      this.state.mode = "running";
    }

    start(){
      
      this.draw();
        const loop = () => {
            if(this.state.mode == "running"){
              this.update();
              this.draw();  
            }
            requestAnimationFrame(loop);
        };
        
        loop();
        this.handleInput();
      } 


}

export default GameManager;