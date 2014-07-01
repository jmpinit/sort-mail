webcam = {
    init: function(callback) {
        navigator.getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

        if (navigator.getUserMedia) {
            navigator.getUserMedia (
                    // constraints
                    { video: true, audio: false },

                    // successCallback
                    function(localMediaStream) {
                        var video = document.querySelector('video');
                        video.src = window.URL.createObjectURL(localMediaStream);

                        console.log("webcam initialized.");
                        video.play();

                        if(callback !== undefined)
                            callback();
                    },

                    // errorCallback
                    function(err) {
                        console.log("The following error occured: " + err);
                        alert(err);
                    }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    },

    preview: function() {
        setInterval(function() {
            var ctx = capture.canvas_preview.getContext("2d");

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
        }, 20);
    }
};
