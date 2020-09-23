import {resizeCanvas, setCanvasResizeEvent} from "./module/canvas.js";
import {setButtonEvents} from "./module/commands.js";
import {Julia} from "./module/Julia.js";

let julia = new Julia();
resizeCanvas();
setButtonEvents(julia);
setCanvasResizeEvent(julia);
julia.drawFractal();