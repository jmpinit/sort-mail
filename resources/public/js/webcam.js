webcam = {
    init: function() {
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
                    },

                    // errorCallback
                    function(err) {
                        console.log("The following error occured: " + err);
                    }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    }
};
