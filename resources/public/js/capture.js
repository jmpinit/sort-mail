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
    },

    send: function() {
        function canvasToBinary(canvas) {
            var ctx = canvas.getContext('2d');

            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            var binaryData = new Uint8Array(new ArrayBuffer(4 + canvas.width*canvas.height*3));

            // metadata
            binaryData[0] = capture.canvas.width >> 8;
            binaryData[1] = capture.canvas.width;

            binaryData[2] = capture.canvas.height >> 8;
            binaryData[3] = capture.canvas.height;

            alert(binaryData[0] + ", " + binaryData[1] + ", " + binaryData[2] + ", " + binaryData[3]);

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

        var bin = canvasToBinary(capture.canvas)
        var data = btoa(String.fromCharCode.apply(null, bin));

        $.ajax({
            type: "POST",
            url: "ocr",
            data: "image=" + data,
            success: function(data) {
                alert("reply! " + data);
            }
        });
    }
}
