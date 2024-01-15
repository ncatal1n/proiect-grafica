
import WebGlUtils from './webglutils.js';
import Ball from './Ball.js';
import Paddle from './Paddle.js';

class GameManager{
    constructor(canvas)
    {
        this.ctx = canvas.getContext('2d');
        this.utils = new WebGlUtils(this.ctx);

        this.width = canvas.width;
        this.height = canvas.height;


        this.state = {
          "mode" : "stopped",
        };

        this.paddleHeight = 20;
        this.paddleWidth = 200;
        this.paddleComputerWidth = 100;

        this.ballSize = 20;

        this.ballSpeed = 1;
        this.paddleSpeed = 1;
        


        this.ball = new Ball(
          (this.width - this.ballSize) / 2,
          (this.height - this.ballSize) / 2,
          this.ballSize,
          5,
          5,
          this.ballSpeed
        );

        this.computer = new Paddle(
            (this.width - this.paddleWidth) / 2,
            0,
            this.paddleComputerWidth,
            this.paddleHeight,
            this.paddleSpeed
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
        return (
          rectA.x < rectB.x + rectB.width &&
          rectA.x + rectA.width > rectB.x &&
          rectA.y < rectB.y + rectB.height &&
          rectA.y + rectA.height > rectB.y
        );
    }


    drawCompPaddle()
    {
        this.utils.drawRectangle('#E23E57', this.computer.x, this.computer.y, this.computer.width, this.computer.height);

    }

    drawScore()
    {


      this.utils.drawText(`Player     ${String(this.score.player).padStart(4, '0')}`, 55, 50);
      this.utils.drawText(`Computer   ${String(this.score.computer).padStart(4, '0')}`, 55, 65);
    }

    drawPaddle(){
        this.utils.drawRectangle('#FD7014', this.player.x, this.player.y, this.player.width, this.player.height);
    }

    drawBall()
    {
        this.utils.drawRectangle('#EEEEEE', this.ball.x, this.ball.y, this.ball.width, this.ball.height);
    }

    updateComputerPaddle() {
 
      let x;
      let vx = Math.abs(this.ball.velocity.x) - 0.75;

      if(this.ball.x < this.computer.x + this.computer.width /2)
      {
        x = this.computer.x - vx;
      }
      else{
        x = this.computer.x + vx;
      }  
      if(10 < x && x < this.width - this.computer.width - 10){
        this.computer.x = x;
      }
    }

    increaseDifficulty()
    {
      let factor = 9.5;
      this.player.width -= factor;
      this.computer.width += factor;
      this.ball.speed += 0.005;

      if(this.player.width <= 10)
      {
        this.state.mode = "gameover";
      }
      
    }



    draw()
    {
        this.utils.clear(this.width, this.height);
        this.drawPaddle();
        this.drawBall();
        this.drawCompPaddle();

        this.player.updatePosition(this.width);
        this.updateComputerPaddle();
        this.drawScore();
    }

    drawMenuScreen(){
      this.utils.clear(this.width, this.height);
      this.utils.drawText("PING-PONG GAME", (this.width / 2), (this.height / 2) - 50,'#FD7014', 48);
      this.utils.drawText("Graphics project with WebGl", (this.width / 2), (this.height / 2) + 8,'#fff', 15,"normal");
      this.utils.drawText("by Bostinaru Nicolae-Catalin", (this.width / 2), (this.height / 2) + 32,'#fff', 10,"normal");


      //CONTROLS  

      this.utils.drawText("CONTROLS", 86, (this.height - 155),'#fff', 20);
      this.utils.drawText("LEFT ARROW KEY       MOVE TO THE LEFT", 150, (this.height - 125),'#fff', 10);
      this.utils.drawText("RIGHT ARROW KEY      MOVE TO THE RIGHT", 152, (this.height - 105),'#fff', 10);
      this.utils.drawText("ENTER KEY            START/STOP THE GAME", 157, (this.height - 85),'#fff', 10);
      this.utils.drawText("'R' KEY              RESET THE GAME", 141, (this.height - 65),'#fff', 10);


    }

    drawGameOver()
    {
      this.utils.clear(this.width, this.height);
      this.utils.drawText("GAME OVER", (this.width / 2), (this.height / 2) - 50,'#FD7014', 48);
      this.utils.drawText(`Player     ${String(this.score.player).padStart(4, '0')}`,  (this.width / 2), (this.height / 2) + 10);
      this.utils.drawText(`Computer   ${String(this.score.computer).padStart(4, '0')}`,  (this.width / 2), (this.height / 2) + 25);
      this.utils.drawText("PRESS 'R' TO RESET THE GAME",(this.width / 2), (this.height / 2) + 45);

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
          this.ball.velocity.y = -this.ball.velocity.y; 
        }
    
        if (this.collision(this.ball, this.computer)) {
          this.ball.velocity.y = -this.ball.velocity.y; 
        }
    
        if (this.ball.y + this.ball.height > this.height) {
          this.score.computer++;
          this.resetGame();
        } else if (this.ball.y < 0) {
          this.score.player++;
          this.resetGame();
        }
      }
    
      resetGame() {

        let ballSpeed = this.ball.speed
        let paddleWidth = this.player.width;
        let compPaddleWidth = this.computer.width;

        this.ball = new Ball(
          (this.width - this.ballSize) / 2,
          (this.height - this.ballSize) / 2,
          this.ballSize,
          5,
          5,
          ballSpeed
        );
  
        this.computer = new Paddle(
            (this.width - compPaddleWidth) / 2,
            0,
            compPaddleWidth,
            this.paddleHeight,
            this.paddleSpeed
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

      this.computer = new Paddle(
          (this.width - this.paddleWidth) / 2,
          0,
          this.paddleComputerWidth,
          this.paddleHeight,
          this.paddleSpeed
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
        const loop = () => {
            if(this.state.mode == "running"){
              this.update();
              this.draw();  
            }
            else if(this.state.mode == "gameover"){
              this.drawGameOver();
            }
            else{
              this.drawMenuScreen();
            }
            requestAnimationFrame(loop);
        };
        
        loop();
        this.handleInput();
        this.drawMenuScreen();
      } 


}

export default GameManager;