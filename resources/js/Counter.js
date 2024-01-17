import Digit from "./Digit.js";

class Counter{
    constructor(utils, pos)
    {
        this.utils = utils;
        this.counter = 0;
        this.colors = {
            "inactive": "475569",
            "active" : "526175"
        };
        this.position = {
            "x" : pos.x,
            "y" :pos.y
        };
        this.d2 = new Digit(
            {
                "x" : this.position.x,
                "y" : this.position.y
            });
        this.d1 = new Digit({
                "x" : this.position.x + 40,
                "y" : this.position.y
            });
    }

    setCounter(number)
    {
        this.counter = number;
    }

    updateCounter(digitObj, digit)
    {
        switch(digit){
            case 0:
                digitObj.sides.top.right.status = "active";
                digitObj.sides.bottom.right.status = "active";
                digitObj.sides.top.left.status = "active";
                digitObj.sides.bottom.left.status = "active";
                digitObj.sides.top.middle.status = "active";
                digitObj.sides.bottom.middle.status = "active";
            case 1:
                digitObj.sides.top.right.status = "active";
                digitObj.sides.bottom.right.status = "active";
                break;
            case 2:
                digitObj.sides.top.middle.status = "active";
                digitObj.sides.top.right.status = "active";
                digitObj.sides.middle.middle.status = "active";

                digitObj.sides.bottom.left.status = "active";
                digitObj.sides.bottom.middle.status = "active";
                break;
            case 3:
                digitObj.sides.top.middle.status = "active";
                digitObj.sides.top.right.status = "active";
                digitObj.sides.middle.middle.status = "active";

                digitObj.sides.bottom.right.status = "active";
                digitObj.sides.bottom.middle.status = "active";
                break;
            case 4:
                digitObj.sides.top.left.status = "active";
                digitObj.sides.top.right.status = "active";
                digitObj.sides.middle.middle.status = "active";

                digitObj.sides.bottom.right.status = "active";
                break;
            case 5:
                digitObj.sides.top.middle.status = "active";
                digitObj.sides.top.left.status = "active";
                digitObj.sides.middle.middle.status = "active";

                digitObj.sides.bottom.right.status = "active";
                digitObj.sides.bottom.middle.status = "active";
                break;
            case 6:
                digitObj.sides.top.middle.status = "active";
                digitObj.sides.top.left.status = "active";
                digitObj.sides.middle.middle.status = "active";

                digitObj.sides.bottom.left.status = "active";
                digitObj.sides.bottom.right.status = "active";
                digitObj.sides.bottom.middle.status = "active";
                break;
            case 7:
                digitObj.sides.top.middle.status = "active";
                digitObj.sides.top.right.status = "active";
                digitObj.sides.bottom.right.status = "active";
                break;
            case 8:
                digitObj.sides.top.middle.status = "active";
                digitObj.sides.top.right.status = "active";
                digitObj.sides.top.left.status = "active";
                digitObj.sides.bottom.right.status = "active";
                digitObj.sides.bottom.left.status = "active";
                digitObj.sides.bottom.middle.status = "active";
                digitObj.sides.middle.middle.status = "active";
                break;
            case 9:
                digitObj.sides.top.middle.status = "active";
                digitObj.sides.top.right.status = "active";
                digitObj.sides.top.left.status = "active";
                digitObj.sides.bottom.right.status = "active";
                digitObj.sides.bottom.middle.status = "active";
                digitObj.sides.middle.middle.status = "active";
        }
    }


    update()
    {
       let counter = this.counter;
       if(counter == 0)
       {
            this.d1.sides.top.right.status = "active";
            this.d1.sides.bottom.right.status = "active";
            this.d1.sides.top.left.status = "active";
            this.d1.sides.bottom.left.status = "active";
            this.d1.sides.top.middle.status = "active";
            this.d1.sides.bottom.middle.status = "active";


       }else{
        this.updateCounter(this.d1, counter % 10);
        this.updateCounter(this.d2, Math.floor(counter / 10));
       }
    }


    draw()
    {
        this.d1.draw(this.utils);
        this.d2.draw(this.utils);
        
    }
}

export default Counter;