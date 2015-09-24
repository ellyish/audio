window.canvas = document.getElementById('canvas')
window.ctx = canvas.getContext('2d')
window.audioCtrl = new AudioCtrl()
var dragged = false;

function update() {

}

function draw() {
    if (dragged == false) {
    	ctx.strokeCircle
        ctx.font = "20px Tahoma";
        ctx.fillStyle = "#45464"
        ctx.fillText("Drag An Audio File Here" , canvas.width / 2 - 100, canvas.height / 2)
        ctx.fillText("اسحب ملف صوتي الى هذه المساحة", canvas.width / 2 - 140, canvas.height / 2 + 20)

    };
    audioCtrl.drawFrequency(ctx)
}

function loop() {

    update()
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw()

    requestAnimationFrame(loop)

}

loop();


canvas.ondragover = function() {
    this.className = 'hover';
    return false;
};


canvas.ondragend = function() {
    this.className = '';
    return false;
};


canvas.ondrop = function(event) {
    this.className = '';

    var file = event.dataTransfer.files[0],
        reader = new FileReader();

    reader.onload = function(event) {
        dragged = true;
        audioCtrl.start(event)


    }

    reader.readAsArrayBuffer(file);

    return false
}