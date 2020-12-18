import {hslToRgb} from "./Utility.js";

export class Fractal {
    constructor() {
        this._canvas = document.getElementById("canvas");
        this._ctx = document.getElementById("canvas").getContext("2d");
        this._ctx.imageSmoothingQuality = "high";
        this._zoom = 1;
        this._moveX = 0;
        this._moveY = 0;
    }

    _drawMandelbrot(width, height, zoom, moveX, moveY) {
        //pixel info as 4 byte rgba
        let imgData = this._ctx.createImageData(width, height);

        //scale to screen orientation
        let stretch = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            ? screen.width / screen.height
            : width / height;

        console.log(`W: ${width}, H${height}`);
        //mandelbrot formula
        for (let pX = 0, w = width; pX < w; pX++)
        {
            for (let pY = 0, h = height; pY < h; pY++)
            {
                //scaled x coordinate of pixel
                let x0 = stretch * (pX - width / 2) / (0.4 * width * zoom) -0.5 + moveX;

                //scaled y coordinate of pixel
                let y0 = (pY - height / 2) / (0.4 * height * zoom) + moveY;

                //optimize settings
                let x = 0, y = 0, iteration = 0,
                    maxIteration = zoom < 2**4 ? 400 : 1000,
                    escapeRadius = zoom < 2**4 ? 16 : 4;

                //calculate iteration
                while (x*x + y*y <= escapeRadius && iteration < maxIteration)
                {
                    let tmp = x*x - y*y + x0;
                    y = 2*x*y + y0;
                    x = tmp;
                    iteration = iteration + 1;
                }
                //smooth radius
                let m = iteration - Math.log(Math.log(x*x + y*y))/Math.log(2.0);

                //color filter
                let k = 11 - zoom/2;
                if (zoom === 2**4)
                    k = 4;
                else if (zoom > 2**4) {
                    k = 3 - Math.log(zoom)/10;
                    k = k < 1 ? 1 : k;
                }

                //set hsl
                let hue = (m * k + 220)/360;
                let sat = Math.tanh(m);
                let lum = Math.tanh(m)*0.5;
                let rgb = hslToRgb(hue, sat, lum);


                //add pixel information to image data
                let pos = (pX + pY * width) * 4;
                imgData.data[pos+0] = rgb[0];
                imgData.data[pos+1] = rgb[1];
                imgData.data[pos+2] = rgb[2];
                imgData.data[pos+3] = 255;
            }
        }
        //draw imgData;
        this._ctx.putImageData(imgData, 0, 0);
    }

    drawFractal(){
        this._drawMandelbrot(this._canvas.width, this._canvas.height, this._zoom, this._moveX, this._moveY);
    }

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
}
