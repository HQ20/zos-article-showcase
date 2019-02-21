var Roles = artifacts.require("./Roles.sol");
var MyContract = artifacts.require("./MyContract.sol");

module.exports = function (deployer) {
    // deploy Roles
    deployer.deploy(Roles);
    deployer.link(Roles, MyContract);
    // deploy MyContract
    deployer.deploy(MyContract);
};
