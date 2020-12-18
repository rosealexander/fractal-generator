import {setCanvasResizeEvent, setClickEvent} from "./src/Utility.js";
import {Fractal} from "./src/Fractal.js";

(() => {
    let fractal = new Fractal();

    //draw to canvas
    fractal.drawFractal();

    //set resize canvas event
    setCanvasResizeEvent(fractal.drawFractal.bind(fractal));

    //set button events
    setClickEvent("arrow-up", fractal.moveUp.bind(fractal));
    setClickEvent("arrow-right", fractal.moveRight.bind(fractal));
    setClickEvent("arrow-down", fractal.moveDown.bind(fractal));
    setClickEvent("arrow-left", fractal.moveLeft.bind(fractal));
    setClickEvent("zoom-in", fractal.zoomIn.bind(fractal));
    setClickEvent("zoom-out", fractal.zoomOut.bind(fractal));
})();
