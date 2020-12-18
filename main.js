import {setCanvasResizeEvent, setClickEvent} from "./src/Utility.js";
import {Fractal} from "./src/Fractal.js";

(() => {
    document.getElementById("canvas").getContext("2d").imageSmoothingQuality = "high"
    let fractal = new Fractal();

    //draw to canvas
    fractal.drawFractal();

    //set resize canvas event
    setCanvasResizeEvent(fractal.drawFractal.bind(fractal));

    //set button events
    setClickEvent("arrow-up", displayLoaderIcon, fractal.moveUp.bind(fractal));
    setClickEvent("arrow-right", displayLoaderIcon, fractal.moveRight.bind(fractal));
    setClickEvent("arrow-down", displayLoaderIcon, fractal.moveDown.bind(fractal));
    setClickEvent("arrow-left", displayLoaderIcon, fractal.moveLeft.bind(fractal));
    setClickEvent("zoom-in", displayLoaderIcon, fractal.zoomIn.bind(fractal));
    setClickEvent("zoom-out", displayLoaderIcon, fractal.zoomOut.bind(fractal));

    document.getElementById("load-icon").style.display = "none";

    function displayLoaderIcon(callback) {
        document.getElementById("load-icon").style.display="unset";
        setTimeout(function () {
            callback();
            return document.getElementById("load-icon").style.display = "none";
        }, 100);
    }
})();
