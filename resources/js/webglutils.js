class WebGlUtils{

    constructor(ctx){
        this.ctx = ctx;
    }


    clear(width, height)
    {
        this.drawRectangle('#393E46', 0,0, width, height);

    }

    drawRectangle(color, x, y, width, height) {

        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, width, height)

    }
    drawText(text, x,y,color = '#fff', fontSize = 11, fontWeight = 'bold', fontFamily = 'courier')
    {
        this.ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }
    


}

export default WebGlUtils;