pragma solidity ^0.5.0;

import "openzeppelin-eth/contracts/math/SafeMath.sol";
import "./Roles.sol";

contract Wallets {
    using SafeMath for uint256;
    //
    struct Wallet {
        uint256 balance;
        uint8 deposits;
    }
    Roles.Data private roles;
    mapping(address => Wallet) internal wallets;
    address[] private usersArray;

    //
    function initWallets() public {
        Roles.setRole(roles, msg.sender, Roles.Role.Admin);
    }

    //    
    function addUserWallet(address _user) public {
        require(Roles.hasRole(roles, _user, Roles.Role.Regist), "User does not have required role.");
        Wallet memory wallet;
        wallet.balance = 0;
        wallets[_user] = wallet;
        usersArray.push(_user);
    }

    //
    function totalUsersBalance() public view returns(uint256) {
        uint256 totalUsers = usersArray.length;
        uint256 totalBalance = 0;
        for (uint256 i = 0; i < totalUsers; i += 1) {
            Wallet memory wallet = wallets[msg.sender];
            totalBalance = totalBalance.add(wallet.balance);
        }
        return totalBalance;
    } 

    //
    function totalDeposits(address _user) public view returns(uint8) {
        Wallet memory wallet = wallets[_user];
        return wallet.deposits;
    }
}