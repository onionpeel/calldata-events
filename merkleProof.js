const { MerkleTree } = require('merkletreejs');
const ethers = require('ethers');
let {recipientEventsArray} = require('./recipientEventsArray');
const sha3 = require('web3-utils').sha3;

/* recipientEventsArray is an array of events emitted from calling registerRecipients()
Each recipient object has an address property and a percentage property.  These will be available via a subgraph when the recipient wants to withdraw funds from the shared funding contract.
A recipient's address and percentage will be hashed to create a digest.  The digests for all the recipients will be used as leaves to create a merkle tree.*/


const createDigest = (address, percentage) => {
  // let addHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes());
  // let perHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('200'));
  // let bytesArray = ethers.utils.concat([addHash, perHash]);
  // let digest = ethers.utils.keccak256(bytesArray);
  // console.log(addHash)

  let abiCoder = new ethers.utils.AbiCoder();
  // let value = abiCoder.encode(['uint'], [200]);
  // value = ethers.utils.keccak256(value);
  // console.log(value)
  // let add = abiCoder.encode(['address'], ['0x90F79bf6EB2c4f870365E785982E1f101E93b906']);
  // add = ethers.utils.keccak256(add);
  // console.log(add)

  let value = abiCoder.encode(['uint'], [percentage]);
  value = ethers.utils.keccak256(value);

  let add = abiCoder.encode(['address'], [address]);
  add = ethers.utils.keccak256(add);

  let digest = abiCoder.encode(['bytes32', 'bytes32'], [add, value]);
  digest = ethers.utils.keccak256(digest);
  console.log(digest)

};

createDigest(recipientEventsArray[0].recipient, recipientEventsArray[0].percentage);

// const leaves = recipientEventsArray.map(x => sha3(x));
// const tree = new MerkleTree(leaves, sha3);
// const root = tree.getRoot().toString('hex');
// const leaf = sha3('a');
// const proof = tree.getProof(leaf);
// console.log(tree.verify(proof, leaf, root));
//
// console.log(tree.toString());
//
// let value1 = SHA256('hello');
// let value2 = sha3('hello');
// let value3 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('hello'));
// console.log(value1);
// console.log(value2);
// console.log(value3);
