// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VideoUploadContract {
    struct Video {
        string hash; // IPFS hash
        address uploader;
        string title;
        string description;
    }

    Video[] public videos;

    event VideoUploaded(string hash, address uploader, string title, string description);

    function uploadVideo(string memory _hash, string memory _title, string memory _description) public {
        videos.push(Video(_hash, msg.sender, _title, _description));
        emit VideoUploaded(_hash, msg.sender, _title, _description);
    }
}
