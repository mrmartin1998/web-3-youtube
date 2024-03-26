// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdInteractionContract {
    mapping(address => bool) public hasWatchedAd;

    event AdWatched(address indexed viewer);
    event AdSkipped(address indexed viewer);

    uint public skipAdFee;

    constructor(uint _skipAdFee) {
    skipAdFee = _skipAdFee; // Initialize the skip ad fee
    }

    function watchAd() public {
        hasWatchedAd[msg.sender] = true;
        emit AdWatched(msg.sender);
    }

    function skipAd() public payable {
        require(msg.value == skipAdFee, "Fee not met to skip ad");
        // Additional logic for what happens when ad is skipped
        emit AdSkipped(msg.sender);
    }


}
