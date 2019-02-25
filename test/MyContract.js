const MyContract = artifacts.require('./MyContract.sol');
const MockRoles = artifacts.require('./mock/MockRoles.sol');

const BigNumber = require('bignumber.js');
const chai = require('chai');
// use default BigNumber
chai.use(require('chai-bignumber')()).should();

contract('MyContract', (accounts) => {
    let myContract;
    let mockRoles;
    const mainAccount = accounts[0];
    const zosDeployer = accounts[1];
    const someUser = accounts[2];
    const depositAmount = 10000000;

    before(async () => {
        myContract = await MyContract.deployed();
        mockRoles = await MockRoles.deployed();
    });
    
    describe('Test some wallet methods', () => {
        before(async () => {
            myContract = await MyContract.new();
            myContract.initialize('Hello', { from: mainAccount });
        });
        it('add user wallet method', async () => {
            await myContract.addUserWallet(someUser, { from: mainAccount });
        });
        it('deposit method', async () => {
            await myContract.deposit({ value: depositAmount, from: someUser });
        });
        it('total user balance method', async () => {
            const totalBalance = new BigNumber(await myContract.totalUsersBalance());
            totalBalance.should.be.bignumber.equal(new BigNumber(depositAmount));
        });
    });

    describe('Test some role methods', () => {
        before(async () => {
            myContract = await MyContract.new();
            mockRoles = await MockRoles.new();
            myContract.initialize('Hello', { from: mainAccount });
        });
        it('add role method', async () => {
            // enum Role { None, Owner, Admin, Regist }
            const roleId = 1;
            assert.equal(await mockRoles.hasRole(someUser, roleId), false, '');
            await mockRoles.setRole(someUser, roleId, { from: mainAccount });
            assert.equal(await mockRoles.hasRole(someUser, roleId), true, '');
            assert.equal(await mockRoles.hasRole(someUser, roleId + 1), true, '');
        });
    });
});
