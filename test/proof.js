const { expect } = require("chai");
const { ethers } = require("hardhat");

let percentages = [ 100, 100, 100, 200, 200,
  200, 300, 300, 300, 400,
  400, 400, 500, 500, 500,
  600, 600, 600, 700, 700]; //sum = 7700


describe("Proof", function () {
  let proof;
  let signers;
  let recipients, recipientEvents;

  it("Deploy Proof.sol", async function () {
    const Proof = await ethers.getContractFactory("Proof");
    proof = await Proof.deploy();
    await proof.deployed();
  });

  it('Retrieves all signer addresses', async () => {
    signers = await hre.ethers.getSigners();
  });

  it('Creates a recipient object for each address with its percentage', async () => {
    recipients = signers.map((signer, i) => {
      return {
        address: signer.address,
        percentage: percentages[i]
      };
    });
    // console.log(recipients)
  });

  it('Proof: registerRecipients()', async () => {
    let tx = await proof.registerRecipients(recipients);
    let txRec = await tx.wait(1);
    recipientEvents = txRec.events.map((recipientObj, i) => {
      let list = {
        address: txRec.events[i].args[0],
        percentage: txRec.events[i].args[1].toString()
      };
      return list;
    });
    // console.log(recipientEvents)
  });

  it('Proof: hash()', async () => {
    await proof.hash();
  });

});
