const { MerkleTree } = require('merkletreejs');
const ethers = require('ethers');
const keccak256 = require('keccak256');
let {eventsArrayTest} = require('./eventsArrayTest'); // test array

/* recipientEvents is an array of events emitted from calling registerRecipients()
Each recipient object has an address property and a percentage property.  These will be available via a subgraph when the recipient wants to withdraw funds from the shared funding contract.
A recipient's address and percentage will be hashed to create a digest.  The digests for all the recipients will be used as leaves to create a merkle tree.*/

/* The recipientEvents has this structure:
[
  {
    address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    percentage: '100'
  },
  ...
]*/

// The digest created by hashing a recipient's address and percentage
const createLeaf = (recipientAddress, percentage) => {
  let recipientAddressHash = ethers.utils.solidityKeccak256(['address'], [recipientAddress]);
  let percentageHash = ethers.utils.solidityKeccak256(['uint'], [percentage]);
  let leaf = ethers.utils.solidityKeccak256(
    ['bytes32', 'bytes32'],
    [recipientAddressHash, percentageHash]
  );

  leaf = Buffer.from(leaf.slice(2), 'hex');
  return leaf;
};

// An array of leaves made from the events emitted for each recipient
const createLeaves = recipientEvents => {
  let leaves = [];
  for (i = 0; i < recipientEvents.length; i++) {
    let digest = createLeaf(recipientEvents[i].recipientAddress, recipientEvents[i].percentage);
    leaves.push(digest);
  };
  return leaves;
};

// Generate a tree based on the array of recipient leaves
const createMerkleTree = recipientEvents => {
  let leavesArray = createLeaves(recipientEvents);
  return new MerkleTree(leavesArray, keccak256, { sortPairs: true });
};

// Returns the root of the tree
const createMerkleRoot = recipientEvents => {
  let leavesArray = createLeaves(recipientEvents);
  let tree = createMerkleTree(recipientEvents);
  return tree.getHexRoot().toString('hex');
};

// Returns a proof used to verify if a leaf belongs to a given root
const createMerkleProof = (recipientEvents, leaf) => {
  let leavesArray = createLeaves(recipientEvents);
  let tree = createMerkleTree(recipientEvents);
  return tree.getHexProof(leaf);
};

// Check if a recipient's address and percentage belongs to a root
const verifyRecipient = (recipientEvents, recipientAddress, percentage) => {
  let leavesArray = createLeaves(recipientEvents);
  const leaf = createLeaf(recipientAddress, percentage);
  const tree = createMerkleTree(recipientEvents);
  const root = createMerkleRoot(recipientEvents);
  const proof = createMerkleProof(recipientEvents, leaf);
  return tree.verify(proof, leaf, root);
};


/* This generator function creates:
  proof
  leaf

When a recipient withdraws funds, the proof and leaf must be sent along with the recipient's percentage to the contract
*/
const generateProofLeaf = (recipientEvents, recipientAddress, percentage) => {
  let leavesArray = createLeaves(recipientEvents);
  const leaf = createLeaf(recipientAddress, percentage);
  const proof = createMerkleProof(recipientEvents, leaf);
  return {proof, leaf};
};

module.exports = {
  createLeaf,
  createLeaves,
  createMerkleTree,
  createMerkleRoot,
  createMerkleProof,
  verifyRecipient,
  generateProofLeaf
};


/*
Here are the steps for when a changemaker applies the SharedFunding contract to a project
Things that are needed:
  1. Address of the project (the changemaker has created this as a clone)
  2. Address of the FundingAllocations contract (this will have been deployed by changedao)
  3. How many NFTs will be minted for the project
  4. The minimum mint price
  5. The minimum duration that a project must exist before the changemaker can terminate it and 1) prevent further minting and 2) allow recipients to withdraw funds
  6. An array of recipient objects. Each object has the recipient address and the percenetage amount for the funding they will receive
  7. A root hash that is built from the array of recipients

The root hash is created using createMerkleRoot().

The object data for each recipient will be emitted as an event and stored via a subgraph
*/


/*
Here are the things that are needed for a recipient to withdraw funds.
  1. proof
  3. token type
  4. recipient's percentage

The createMerkleProof() will use this leaf and will need the array of recipient objects, which can be created from the subgraph.
*/




//**************************************************************************
// Example for using generateProofLeaf():
// let merkleObj = generateProofLeaf(
//   eventsArrayTest,
//   eventsArrayTest[0].recipientAddress,
//   eventsArrayTest[0].percentage
// );
// console.log(merkleObj);

//********************************************************************

// This sequence can be used to test the functions:

// let leaf = createLeaf(eventsArrayTest[0].recipientAddress, eventsArrayTest[0].percentage);
// let leaves = createLeaves(eventsArrayTest);
// let tree = createMerkleTree(eventsArrayTest);
// let root = createMerkleRoot(eventsArrayTest);
// let proof = createMerkleProof(eventsArrayTest, leaf);
// let verified = tree.verify(proof, leaf, root);
// console.log(verified)
