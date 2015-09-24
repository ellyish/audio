var AudioCtrl = function() {
    this.context = new AudioContext();
    this.source = this.context.createBufferSource(); // creates a sound source
    this.javascriptNode = this.context.createScriptProcessor(2048, 1, 1);
    // connect to destination, else it isn't called
    this.javascriptNode.connect(this.context.destination);

    // setup a analyzer
    this.analyser = this.context.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 512;

    // create a buffer source node
    this.source.connect(this.analyser);
    this.source.connect(this.context.destination);

    this.analyser.connect(this.javascriptNode);

    this.javascriptNode.onaudioprocess = this.draw;

}

AudioCtrl.prototype.drawFrequency = function(ctx) {

    // get the average for the first channel
    var array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(array);

    // clear the current state
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // set the fill style
    var gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, '#000000');
    gradient.addColorStop(0.75, '#ff0000');
    gradient.addColorStop(0.25, '#ffff00');
    gradient.addColorStop(0, '#ffffff');

    ctx.fillStyle = gradient;

    for (var i = 0; i < (array.length); i++) {
        var value = array[i];
        ctx.fillRect(i * 5, 325 - value, 3, 325);
    }

};


AudioCtrl.prototype.start = function(event) {
	var the = this;
    this.context.decodeAudioData(event.target.result, function(buffer) {
        // when the audio is decoded play the sound
        the.source.buffer = buffer;
        the.source.start()
    });

};



