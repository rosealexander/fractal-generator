export class Julia {

    constructor() {
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");
        this._isJulia = false;
        this._zoom = 1;
        this._moveX = 0;
        this._moveY = 0;
        this._colorMix = 1;
    }


    _resetCXYZ() {
        this._colorMix = 1;
        this._moveX = 0;
        this._moveY = 0;
        this._zoom = 1;
    };

    _drawJulia(){
        //formula for julia set
        for(let pX = 0; pX < this._canvas.width; pX++){
            for(let pY = 0; pY < this._canvas.height; pY++){

                let zx = 1.5 * (pX - this._canvas.width / 2) / (0.5 * this._canvas.width * this._zoom) + this._moveX;
                let zy = (pY - this._canvas.height / 2) / (0.5 * this._canvas.height * this._zoom) + this._moveY;
                let cy = 0.27015;
                let cx = -0.7;
                let i = 0;
                let max = 300;

                while (zx * zx - zy * zy < 4 && i < max){
                    let tmp = zx * zx - zy * zy;
                    zy = 2 * zx * zy + cy;
                    zx = tmp + cx;

                    i++;
                }

                //draw pixels
                this._ctx.fillStyle = `rgb(${this._colorMix*i**2%255}, ${this._colorMix*i%255}, ${this._colorMix*i**3%255})`;
                this._ctx.fillRect(pX,pY,1,1);
            }
        }
    };

    _drawMandelbrot() {
        //mandelbrot formula
        for(let pX = 0; pX < this._canvas.width; pX++){
            for(let pY = 0; pY < this._canvas.height; pY++){

                let x0 = 1.5 * (pX - this._canvas.width / 2) / (0.4 * this._canvas.width * this._zoom) -0.5 + this._moveX;
                let y0 = (pY - this._canvas.height / 2) / (0.4 * this._canvas.height * this._zoom) + this._moveY;

                let x = 0;
                let y = 0;

                let i = 0;
                let max = 500;

                while (x*x + y*y <= 4 && i < max){
                    let tmp = x*x - y*y + x0;
                    y = 2*x*y + y0;
                    x = tmp;
                    i++;
                }

                //draw pixels
                this._ctx.fillStyle = `rgb(${this._colorMix*i**3%255}, ${this._colorMix*i**2%255}, ${this._colorMix*i**5%255})`;
                this._ctx.fillRect(pX,pY,1,1);
            }
        }
    };


    drawFractal(){
        this._isJulia ? this._drawJulia() : this._drawMandelbrot();
    };

    zoomIn(){
        if ( this._zoom < 2**42 ) {
            this._zoom = this._zoom * 2;
            this.drawFractal();
        }
    };

    zoomOut(){
        if (this._zoom > 0.5) {
            this._zoom = this._zoom / 2;
            this.drawFractal();
        }
    };

    moveUp(){
        this._moveY = this._moveY - (1/this._zoom);
        this.drawFractal();
    };

    moveDown(){
        this._moveY = this._moveY + (1/this._zoom);
        this.drawFractal();
    };

    moveLeft(){
        this._moveX = this._moveX - (1/this._zoom);
        this.drawFractal();
    };

    moveRight(){
        this._moveX = this._moveX + (1/this._zoom);
        this.drawFractal();
    }

    toggleDrawing(){
        this._isJulia ? this._isJulia = false : this._isJulia = true;
        this._resetCXYZ();
        this.drawFractal();
    }

    randomColor(){
        this._colorMix += this._colorMix;
        this.drawFractal();
    }

}