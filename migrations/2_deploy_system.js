var Roles = artifacts.require("./Roles.sol");
var MockRoles = artifacts.require("./mock/MockRoles.sol");
var MyContract = artifacts.require("./MyContract.sol");

module.exports = function (deployer, network, accounts) {
    // deploy Roles
    deployer.deploy(Roles);
    deployer.link(Roles, MyContract);
    deployer.link(Roles, MockRoles);
    // deploy MyContract
    deployer.deploy(MyContract);
    // deploy MockRoles
    deployer.deploy(MockRoles);
};
