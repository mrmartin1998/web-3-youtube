const AdInteractionContract = artifacts.require("AdInteractionContract");
const skipAdFee = web3.utils.toWei("0.01", "ether"); // Example fee amount, set as needed
const RewardsContract = artifacts.require("RewardsContract");
const VideoUploadContract = artifacts.require("VideoUploadContract");

module.exports = function (deployer) {
    deployer.deploy(AdInteractionContract, skipAdFee).then(() => {
        console.log("AdInteractionContract deployed at:", AdInteractionContract.address);
    });

    deployer.deploy(RewardsContract).then(() => {
        console.log("RewardsContract deployed at:", RewardsContract.address);
    });

    deployer.deploy(VideoUploadContract).then(() => {
        console.log("VideoUploadContract deployed at:", VideoUploadContract.address);
    });
};
