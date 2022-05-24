//const MiladyMaker= artifacts.require("../contracts/Miladys.sol");
const SonoraMaker = artifacts.require("../contracts/SonoraMaker.sol");

module.exports = function (deployer) {
  //deployer.deploy(MiladyMaker);
  deployer.deploy(SonoraMaker, 'http://localhost:8000');
};
