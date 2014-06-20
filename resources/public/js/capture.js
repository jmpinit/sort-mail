capture = {
    init: function() {
        var canvas = document.querySelector("canvas");
        var video = document.querySelector("video");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight * 0.1;

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "#F00";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        console.log("made canvas visible.");
    }
}
