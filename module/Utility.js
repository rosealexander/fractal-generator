/**
 * Creates event listener "resize."
 * Function will be called whenever the resize event is triggered.
 * @param   {function} func      The function.
 * @return  void
 */
export const setCanvasResizeEvent = func => {
    const _debounce = (func) => {
        let timer;
        return event => {
            if(timer) { clearTimeout(timer);}
            timer = setTimeout(func,32,event);
        };
    };

    const _onResize = () => {
        //Reset width to match browser window dimensions
        const _resetCanvasWidth = () => {
            const canvas = document.querySelector('canvas');
            /iPhone|iPad|iPod/i.test(navigator.userAgent) ?
                window.innerHeight > window.innerWidth ?
                    canvas.width = screen.width * window.devicePixelRatio
                    : canvas.width = screen.height * window.devicePixelRatio
                : canvas.width = window.innerWidth * window.devicePixelRatio;
        }
        _resetCanvasWidth();
        //Reset height to match browser window dimensions
        const _resetCanvasHeight = () => {
            const canvas = document.querySelector('canvas');
            /iPhone|iPad|iPod/i.test(navigator.userAgent) ?
                window.innerHeight > window.innerWidth ?
                    canvas.height = 1.04 * screen.height * window.devicePixelRatio
                    : canvas.height = 1.04 * screen.width * window.devicePixelRatio
                : canvas.height = 1.04 * window.innerHeight * window.devicePixelRatio;
        }
        _resetCanvasHeight();
        func();
    };
    window.addEventListener("resize", _debounce(_onResize));
    _onResize();
};

/**
 * Creates event listener "click" binding a function call to a HTML element.
 * Function will be called whenever the click event is delivered to the HTML element.
 * @param   {HTMLElement} elementId      The HTML element ID.
 * @param   {function} func              The function.
 * @return  void
 */
export const setClickEvent = (elementId, func) => {
    document.getElementById(elementId).addEventListener("click", function () {
        func();
    });
};

/**
 * Modified form "https://gist.github.com/mjackson/5311256.js"
 * by Michael Jackson, CC BY-SA 3.0
 * Converts an HSL color value to RGB.
 * returns r, g, and b in the set [0, 255].
 * @param   {number}  h       Hue
 * @param   {number}  s       Saturation
 * @param   {number}  l       Lightness
 * @return  {Array}           RGB representation
 */
export const hslToRgb = (h, s, l) => {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const hst2rgb = (p, q, t) => {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    }

    return [
        Math.round(hst2rgb(p, q, h + 1/3) * 255),
        Math.round(hst2rgb(p, q, h) * 255),
        Math.round(hst2rgb(p, q, h - 1/3) * 255)
    ];
}
