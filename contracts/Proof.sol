//SPDX-License-Identifier: MIT;
pragma solidity 0.8.6;

import "hardhat/console.sol";

contract Proof {
  event RecipientRegistered(address indexed recipient, uint256 indexed percentage);

  struct Recipient {
    address recipient;
    uint256 percentage;
  }

  function registerRecipients(Recipient[] calldata recipients) external {
    for (uint256 i = 0; i < recipients.length; i++) {
      emit RecipientRegistered(recipients[i].recipient, recipients[i].percentage);
    }
  }

  function hash() public {
    uint256 num = 200;
    bytes32 addHash = keccak256(abi.encode(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266));

    bytes32 value = keccak256(abi.encode(100));
    // console.logBytes32(addHash);

    bytes32 digest = keccak256(abi.encode(addHash, value));
    console.logBytes32(digest);
  }
}
