export function toggleSwitch(){
    let on = document.getElementById("switch-on"), off = document.getElementById("switch-off");
    on.style.display === "none" ? (on.style.display = "inline-block", off.style.display = "none") :
        (on.style.display = "none", off.style.display = "inline-block")
}

export function spinnerOn(){
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    let isMobileSafari = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    isSafari || isMobileSafari ?
        document.getElementById("hour-glass").style.display="unset"
        : document.getElementById("spinner").style.display="unset";
}

export function spinnerOff(){
    setTimeout(function () {
        document.getElementById("hour-glass").style.display = "none";
        document.getElementById("spinner").style.display = "none";
    }, 100);
}

export function setButtonEvents(instanceName) {

    const touchStartEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
    const touchEndEvent = 'ontouchend' in window ? 'touchend' : 'mouseup';

    document.getElementById('buttons').addEventListener(touchStartEvent, spinnerOn);
    document.getElementById('buttons').addEventListener(touchEndEvent, spinnerOff);

    document.getElementById('arrow-up').addEventListener("click", function () {
        instanceName.moveUp()
    });
    document.getElementById('arrow-down').addEventListener("click", function () {
        instanceName.moveDown()
    });
    document.getElementById('arrow-left').addEventListener("click", function () {
        instanceName.moveLeft()
    });
    document.getElementById('arrow-right').addEventListener("click", function () {
        instanceName.moveRight()
    });
    document.getElementById('switch-on').addEventListener("click", function () {
        instanceName.toggleDrawing();
        toggleSwitch()
    });
    document.getElementById('switch-off').addEventListener("click", function () {
        instanceName.toggleDrawing();
        toggleSwitch()
    });
    document.getElementById('zoom-in').addEventListener("click", function () {
        instanceName.zoomIn()
    });
    document.getElementById('zoom-out').addEventListener("click", function () {
        instanceName.zoomOut()
    });
    document.getElementById('random').addEventListener("click", function () {
        instanceName.randomColor()
    });
}