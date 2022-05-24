//const MiladyMaker= artifacts.require("../contracts/Miladys.sol");
const SonoraMaker = artifacts.require("../contracts/SonoraMaker.sol");

module.exports = function (deployer) {
  //deployer.deploy(MiladyMaker);
  deployer.deploy(SonoraMaker, 'https://gateway.pinata.cloud/ipfs/QmX89dvzA3TSwsGfY7SthYkDxSFjszec8JkEEZE7JP5QHF/');
};
