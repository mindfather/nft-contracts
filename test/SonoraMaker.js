const sonora = artifacts.require("../contracts/SonoraMaker.sol");
const miladys = artifacts.require("../contracts/Miladys.sol");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SonoraMaker", accounts => {
  it("Reserve Mint 33 SonoraMakers", () => {
    let contract;
    return sonora.deployed()
      .then(async instance => {
        contract = instance;
        const result = await contract.reserveMint(33, {from: accounts[0]});
        return result;
      })
      .then(async msg => {
        const totalSupply = await contract.totalSupply();
        return totalSupply;
      })
      .then(amountMinted => {
        assert.equal(amountMinted.toNumber(), 33, "There should only be 33 sonoras minted!");
      });
  });

  it("Fail minting a Sonora due to no milady", () => {
    let contract;
    return sonora.deployed()
      .then(async instance => {
        contract = instance;
        try {
          const result = await contract.mint({from: accounts[1]});
        } catch (error) {
          return true;
        }
        assert(false, "This mint should've failed!");
      });
  });

  /* Enable with the milady contract, re-implement setMMAddress
  it("Succeed minting a Sonora due to milady", () => {
    let miladyInstance, sonoraInstance;
    return miladys.deployed()
      .then(async instance => {
        miladyInstance = instance;
        const saleActive = await miladyInstance.flipSaleState({from: accounts[0]});
        const mint = await miladyInstance.mintMiladys(10, {from: accounts[1], value: web3.utils.toWei('0.75', 'ether')});
        return sonora.deployed();
      })
      .then(async instance => {
        sonoraInstance = instance;
        const changeAddress = await sonoraInstance.setMMAddress(miladyInstance.address, {from: accounts[0]});
        const result = await sonoraInstance.mint({from: accounts[1]});
        return sonoraInstance.balanceOf(accounts[1]);
      })
      .then(balance => {
        assert.equal(balance.toNumber(), 1, "The user should have one sonora!");
      });
  });
  */
});
