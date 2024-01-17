class Digit{
    constructor(positon)
    {
        this.position = {
            "x" : positon.x,
            "y" : positon.y
        };
        this.colors = {
            "inactive": "1f1d1d",
            "active" : "363333"
        };
        this.sides = {
            "top" : {
                "left" : {
                    "x" : this.position.x - 6,
                    "y" : this.position.y + 7,
                    "width" :8,
                    "height" : 20 ,
                    "status" : "inactive"
                },
                "right" : {
                    "x" : this.position.x + 23,
                    "y" : this.position.y + 7,
                    "width" :8,
                    "height" : 20 ,
                    "status" : "inactive"
                },
                "middle": {
                    "x" : this.position.x,
                    "y" : this.position.y,
                    "width" :25,
                    "height" : 8 ,
                    "status" : "inactive"
                }
            },
            "bottom" : {
                "right" : {
                    "x" : this.position.x + 23,
                    "y" : this.position.y + 32,
                    "width" :8,
                    "height" :20 ,
                    "status" : "inactive"
                },
                "left" : {
                    "x" : this.position.x - 6,
                    "y" : this.position.y + 32,
                    "width" :8,
                    "height" : 20 ,
                    "status" : "inactive"
                },
                "middle": {
                    "x" : this.position.x,
                    "y" : this.position.y + 51.5,
                    "width" :25,
                    "height" : 8 ,
                    "status" : "inactive"
                }
            },  
            "middle" : {
                "middle": {
                    "x" : this.position.x,
                    "y" : this.position.y + 25,
                    "width" :25,
                    "height" : 8 ,
                    "status" : "inactive"
                }
            }
        };
    }
    draw(utils){


        utils.drawRectangle(this.colors[this.sides.middle.middle.status],this.sides.middle.middle.x,this.sides.middle.middle.y, this.sides.middle.middle.width,this.sides.middle.middle.height);


        utils.drawRectangle(this.colors[this.sides.top.middle.status],this.sides.top.middle.x,this.sides.top.middle.y, this.sides.top.middle.width,this.sides.top.middle.height);

        utils.drawRectangle(this.colors[this.sides.top.right.status],this.sides.top.right.x,this.sides.top.right.y, this.sides.top.right.width,this.sides.top.right.height);

        utils.drawRectangle(this.colors[this.sides.top.left.status],this.sides.top.left.x,this.sides.top.left.y, this.sides.top.left.width,this.sides.top.left.height);

        utils.drawRectangle(this.colors[this.sides.bottom.middle.status],this.sides.bottom.middle.x,this.sides.bottom.middle.y, this.sides.bottom.middle.width,this.sides.bottom.middle.height);

        utils.drawRectangle(this.colors[this.sides.bottom.left.status],this.sides.bottom.left.x,this.sides.bottom.left.y, this.sides.bottom.left.width,this.sides.bottom.left.height);

        utils.drawRectangle(this.colors[this.sides.bottom.right.status],this.sides.bottom.right.x,this.sides.bottom.right.y, this.sides.bottom.right.width,this.sides.bottom.right.height);




        
    }

}

export default Digit;