// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RewardsContract {
    mapping(address => uint256) public rewards;

    function rewardForWatchingAd(address user) public {
        uint256 rewardAmount = calculateAdReward();
        rewards[user] += rewardAmount;
    }

    function calculateAdReward() internal pure returns (uint256) {
        uint256 rewardValue = 10; // Example fixed value
        return rewardValue;
    }

    function claimReward() public {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        payable(msg.sender).transfer(reward);
        rewards[msg.sender] = 0;
    }
}
