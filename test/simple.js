// const { expect } = require("chai");
// const { ethers } = require("hardhat");
//
// describe("Simple", function () {
//   let simple;
//   let signers;
//
//   it("Deploy Simple.sol", async function () {
//     const Simple = await ethers.getContractFactory("Simple");
//     simple = await Simple.deploy();
//     await simple.deployed();
//   });
//
//   it('Retrieves all signer addresses', async () => {
//     signers = await hre.ethers.getSigners();
//   });
//
//   it('Creates a recipient object for each address', async () => {
//     signers = signers.map(signer => {
//       let recipientObj = {
//         recipient: signer.address,
//         percentage: 500
//       };
//       return recipientObj;
//     });
//     // console.log(signers)
//   });
//
//   it('Simple: registerRecipients()', async () => {
//     let tx = await simple.registerRecipients(signers);
//     let txRec = await tx.wait(1);
//     let recipientList = txRec.events.map((recipientObj, i) => {
//       let list = {
//         [`recipient${i}'s address:`]: txRec.events[i].args[0],
//         [`recipient${i}'s percentage:`]: txRec.events[i].args[1].toString()
//       };
//       return list;
//     });
//     // console.log(recipientList)
//   });
//
//   it('Simple: addToArraywithEvent()', async () => {
//     let tx = await simple.addToArrayWithEvent(signers);
//     let txRec = await tx.wait(1);
//   });
//
//   it('Simple: addToArrayWithoutEvent()', async () => {
//     let tx = await simple.addToArrayWithoutEvent(signers);
//     let txRec = await tx.wait(1);
//   });
//
//
// });
