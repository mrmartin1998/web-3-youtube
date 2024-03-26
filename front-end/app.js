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

const normalVideos = [
    'basketball.mp4',
    'football.mp4',
    'soccer.mp4'
];

const adVideos = [
    'sunblock-ad.mp4'
];

function getRandomAd() {
    return adVideos[Math.floor(Math.random() * adVideos.length)];
}

function loadVideoPlayer(element, videoPath) {
    openModal(videoPath);
}

function openModal(mainVideoPath) {
    var videoPlayer = document.getElementById("modalVideo");
    var adPath = getRandomAd();
    var skipButton = document.getElementById("skipAd");
    
    videoPlayer.src = adPath;
    skipButton.style.display = "none"; // Hide skip button initially
    modal.style.display = "block";

    videoPlayer.onended = function() {
        skipButton.style.display = "none"; // Hide skip button when ad ends
        videoPlayer.src = mainVideoPath;
        videoPlayer.play();
    };

    setTimeout(function() {
        skipButton.style.display = "block"; // Show skip button after a delay
    }, 5000); // 5000 milliseconds = 5 seconds

    skipButton.onclick = function() {
        videoPlayer.src = mainVideoPath;
        videoPlayer.play();
        skipButton.style.display = "none";
    };
}

