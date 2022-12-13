var MyErc20Token = artifacts.require("./MyErc20Token.sol");

module.exports = function(deployer) {
    let initialSupply = 5000e10;
    deployer.deploy(MyErc20Token, initialSupply);
};
