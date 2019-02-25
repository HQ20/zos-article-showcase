const MyContract = artifacts.require('./MyContract.sol');
const MockRoles = artifacts.require('./mock/MockRoles.sol');

const BigNumber = require('bignumber.js');
const chai = require('chai');
// use default BigNumber
chai.use(require('chai-bignumber')()).should();

contract('MyContract', (accounts) => {
    let myContract;
    let mockRoles;
    const zosDeployer = accounts[0];
    const userAdmin = accounts[1];
    const someUser = accounts[2];
    const someOtherUser = accounts[3];
    const depositAmount = 10000000;

    before(async () => {
        myContract = await MyContract.deployed();
        mockRoles = await MockRoles.deployed();
    });
    
    describe('Test some wallet methods', () => {
        beforeEach(async () => {
            myContract = await MyContract.new();
            myContract.initialize('Hello', userAdmin, { from: zosDeployer });
        });
        it('add user wallet method', async () => {
            await myContract.addUserWallet(someUser, { from: userAdmin });
        });
        it('deposit method', async () => {
            await myContract.addUserWallet(someUser, { from: userAdmin });
            await myContract.deposit({ value: depositAmount, from: someUser });
        });
        it('total user balance method', async () => {
            await myContract.addUserWallet(someUser, { from: userAdmin });
            await myContract.deposit({ value: depositAmount, from: someUser });
            const totalBalance = new BigNumber(await myContract.totalUsersBalance());
            totalBalance.should.be.bignumber.equal(new BigNumber(depositAmount));
        });
        it('erc20 user balance', async () => {
            await myContract.addUserWallet(someUser, { from: userAdmin });
            await myContract.deposit({ value: depositAmount, from: someUser });
            const totalBalance = new BigNumber(await myContract.balanceOf(someUser));
            totalBalance.should.be.bignumber.equal(new BigNumber(depositAmount));
        });
        it('user deposits', async () => {
            // one user
            await myContract.addUserWallet(someUser, { from: userAdmin });
            await myContract.deposit({ value: depositAmount, from: someUser });
            const total1 = new BigNumber(await myContract.totalUserDeposits(someUser));
            total1.should.be.bignumber.equal(new BigNumber(1));
            // another user
            await myContract.addUserWallet(someOtherUser, { from: userAdmin });
            await myContract.deposit({ value: depositAmount, from: someOtherUser });
            await myContract.deposit({ value: depositAmount, from: someOtherUser });
            const total2 = new BigNumber(await myContract.totalUserDeposits(someOtherUser));
            total2.should.be.bignumber.equal(new BigNumber(2));
            // test
            const total3 = new BigNumber(await myContract.totalDeposits());
            total3.should.be.bignumber.equal(new BigNumber(3));
        });
        it('get user acounts', async () => {
            // user addresses
            await myContract.addUserWallet(someUser, { from: userAdmin });
            await myContract.addUserWallet(someOtherUser, { from: userAdmin });
            const expected = [ someUser, someOtherUser ];
            const users = await myContract.getWalletAddresses();
            assert.equal(users[0], expected[0], '');
            assert.equal(users[1], expected[1], '');
        });
    });

    describe('Test some role methods', () => {
        beforeEach(async () => {
            myContract = await MyContract.new();
            mockRoles = await MockRoles.new();
            myContract.initialize('Hello', userAdmin, { from: zosDeployer });
        });
        it('add role method', async () => {
            // enum Role { None, Owner, Admin, Regist }
            const roleId = 1;
            assert.equal(await mockRoles.hasRole(someUser, roleId), false, '');
            await mockRoles.setRole(someUser, roleId, { from: userAdmin });
            assert.equal(await mockRoles.hasRole(someUser, roleId), true, '');
            assert.equal(await mockRoles.hasRole(someUser, roleId + 1), true, '');
        });
        it('transfer role method', async () => {
            // enum Role { None, Owner, Admin, Regist }
            const roleId = 1;
            assert.equal(await mockRoles.hasRole(someUser, roleId), false, '');
            await mockRoles.setRole(someUser, roleId, { from: userAdmin });
            assert.equal(await mockRoles.hasRole(someUser, roleId), true, '');
            await mockRoles.transferRole(someUser, someOtherUser, { from: userAdmin });
            assert.equal(await mockRoles.hasRole(someUser, roleId), false, '');
            assert.equal(await mockRoles.hasRole(someOtherUser, roleId), true, '');
        });
    });
});
