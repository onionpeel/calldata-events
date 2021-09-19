//SPDX-License-Identifier: MIT;
pragma solidity 0.8.6;

contract Simple {
  event RecipientRegistered(address indexed recipient, uint256 indexed percentage);

  struct Recipient {
    address recipient;
    uint256 percentage;
  }

  Recipient[] public recipientArray;

  function addToArrayWithEvent(Recipient[] calldata recipients) external {
    for (uint256 i = 0; i < recipients.length; i++) {
      recipientArray.push(recipients[i]);
      emit RecipientRegistered(recipients[i].recipient, recipients[i].percentage);
    }
  }

  function addToArrayWithoutEvent(Recipient[] calldata recipients) external {
    for (uint256 i = 0; i < recipients.length; i++) {
      recipientArray.push(recipients[i]);
    }
  }

  function registerRecipients(Recipient[] calldata recipients) external {
    for (uint256 i = 0; i < recipients.length; i++) {
      emit RecipientRegistered(recipients[i].recipient, recipients[i].percentage);
    }
  }
}
