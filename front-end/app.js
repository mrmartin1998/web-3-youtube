// Get the modal
var modal = document.getElementById("videoModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal and play video
function openModal(videoPath) {
    var videoPlayer = document.getElementById("modalVideo");
    videoPlayer.src = videoPath;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    var videoPlayer = document.getElementById("modalVideo");
    videoPlayer.pause();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        var videoPlayer = document.getElementById("modalVideo");
        videoPlayer.pause();
    }
}

function loadVideoPlayer(element, videoPath) {
    openModal(videoPath);
}

function openModal(mainVideoPath) {
    var videoPlayer = document.getElementById("modalVideo");
    videoPlayer.src = 'path_to_ad.mp4'; // Load ad video first
    modal.style.display = "block";

    videoPlayer.onended = function() {
        videoPlayer.src = mainVideoPath; // After ad, load main video
        videoPlayer.play(); // Play main video
    };
}
