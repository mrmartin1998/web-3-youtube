// Import Web3

const adInteractionABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_skipAdFee",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "viewer",
          "type": "address"
        }
      ],
      "name": "AdSkipped",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "viewer",
          "type": "address"
        }
      ],
      "name": "AdWatched",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasWatchedAd",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "skipAdFee",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "watchAd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "skipAd",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    }
  ];
const adInteractionAddress = '0xF119a232352885D6845E7a80bb3a14903aB90da2';

const rewardsABI =  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "rewards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "rewardForWatchingAd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const rewardsAddress = '0xe1d1c09Bd8a0e97AA707c20dBE1b7bCE8afA9Fc5';

const videoUploadABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "uploader",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "VideoUploaded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "videos",
      "outputs": [
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "uploader",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "uploadVideo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const videoUploadAddress = '0x26e09b781E631C0C45aeeA314B96827C5123E5c4';


let adInteractionContract, rewardsContract, videoUploadContract;

async function initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");;
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Ethereum enabled');
            setupContracts(web3);
        } catch (error) {
            console.error("User denied account access...");
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

function setupContracts(web3) {
    adInteractionContract = new web3.eth.Contract(adInteractionABI, adInteractionAddress);
    rewardsContract = new web3.eth.Contract(rewardsABI, rewardsAddress);
    videoUploadContract = new web3.eth.Contract(videoUploadABI, videoUploadAddress);
    console.log('Contracts are set up and ready to interact with.');
}

window.addEventListener('load', initializeWeb3);

//upload video function:
async function uploadVideo(title, hash, description) {
    const accounts = await web3.eth.getAccounts();
    await videoUploadContract.methods.uploadVideo(hash, title, description).send({ from: accounts[0] });
}

//watch ad funciton:
async function watchAd() {
    const accounts = await web3.eth.getAccounts();
    await adInteractionContract.methods.watchAd().send({ from: accounts[0] });
}

//Skip Ad Function:
async function skipAd() {
    const accounts = await web3.eth.getAccounts();
    const fee = 1;
    await adInteractionContract.methods.skipAd().send({ from: accounts[0], value: fee });
}

//Claim Reward Function:
async function claimReward() {
    const accounts = await web3.eth.getAccounts();
    await rewardsContract.methods.claimReward().send({ from: accounts[0] });
}



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

window.addEventListener('load', initializeWeb3);
