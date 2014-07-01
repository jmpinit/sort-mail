capture = {
    frame: {
        x: 0, y: 0.0,
        width: 1, height: 0.1
    },

    canvas_frame: null,
    canvas_preview: null,
    video: null,

    init: function() {
        capture.canvas_frame = document.getElementById("frame");
        capture.canvas_preview = document.getElementById("preview");
        capture.video = document.querySelector("video");

        capture.canvas_frame.width = capture.video.videoWidth;
        capture.canvas_frame.height = capture.video.videoHeight * 0.1;

        capture.canvas_preview.width = capture.canvas_frame.width;
        capture.canvas_preview.height = capture.canvas_frame.height;

        console.log("canvas_frame sized.");
    },

    take: function() {
        var ctx = capture.canvas_frame.getContext("2d");

        var src = {
           x: capture.video.videoWidth * capture.frame.x,
           y: capture.video.videoHeight * capture.frame.y,
           width: capture.video.videoWidth * capture.frame.width,
           height: capture.video.videoHeight * capture.frame.height
        }

        var dest = {
            x: 0,
            y: 0,
            width: capture.canvas_frame.width,
            height: capture.canvas_frame.height
        }

        ctx.drawImage(capture.video, src.x, src.y, src.width, src.height, dest.x, dest.y, dest.width, dest.height);
    },

    send: function() {
        function canvasToBinary(canvas_frame) {
            var ctx = canvas_frame.getContext('2d');

            var imageData = ctx.getImageData(0, 0, canvas_frame.width, canvas_frame.height).data;
            var binaryData = new Uint8Array(new ArrayBuffer(4 + canvas_frame.width*canvas_frame.height*3));

            // metadata
            binaryData[0] = capture.canvas_frame.width >> 8;
            binaryData[1] = capture.canvas_frame.width;

            binaryData[2] = capture.canvas_frame.height >> 8;
            binaryData[3] = capture.canvas_frame.height;

            var pixelIndex = 4;

            for(var i = 0; i < imageData.length; i += 4, pixelIndex += 3) {
                var red = imageData[i];
                var green = imageData[i+1];
                var blue = imageData[i+2];

                binaryData[pixelIndex] = red;
                binaryData[pixelIndex+1] = green;
                binaryData[pixelIndex+2] = blue;
            }

            return binaryData;
        }

        var bin = canvasToBinary(capture.canvas_frame)
        var data = btoa(String.fromCharCode.apply(null, bin));

        $.ajax({
            type: "POST",
            url: "ocr",
            data: "image=" + data,
            success: function(data) {
                console.log("reply! " + data);
            }
        });
    }
}
