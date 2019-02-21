const MyContract = artifacts.require('./MyContract.sol');

const BigNumber = require('bignumber.js');
const chai = require('chai');
// use default BigNumber
chai.use(require('chai-bignumber')()).should();

contract('MyContract', (accounts) => {
    let myContract;

    before(async () => {
        myContract = MyContract.deployed();
    });

    describe('Test some wallet methods', () => {
        before(async () => {
            //
        });
        it('add user wallet method', async () => {
            //
        });
        it('deposit method', async () => {
            //
        });
        it('total user balance method', async () => {
            //
        });
    });

    describe('Test some role methods', () => {
        before(async () => {
            //
        });
        it('add role method', async () => {
            //
        });
    });
});
