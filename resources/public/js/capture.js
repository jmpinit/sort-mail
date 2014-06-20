capture = {
    frame: {
        x: 0, y: 0.9,
        width: 1, height: 0.1
    },

    canvas: null,
    video: null,

    init: function() {
        capture.canvas = document.querySelector("canvas");
        capture.video = document.querySelector("video");

        capture.canvas.width = capture.video.videoWidth;
        capture.canvas.height = capture.video.videoHeight * 0.1;

        console.log("canvas sized.");
    },

    take: function() {
        var ctx = capture.canvas.getContext("2d");

        var src = {
           x: capture.video.videoWidth * capture.frame.x,
           y: capture.video.videoHeight * capture.frame.y,
           width: capture.video.videoWidth * capture.frame.width,
           height: capture.video.videoHeight * capture.frame.height
        }

        var dest = {
            x: 0,
            y: 0,
            width: capture.canvas.width,
            height: capture.canvas.height
        }

        ctx.drawImage(capture.video, src.x, src.y, src.width, src.height, dest.x, dest.y, dest.width, dest.height);
    }
}
