pragma solidity ^0.5.0;

import "openzeppelin-eth/contracts/math/SafeMath.sol";
import "./Roles.sol";

contract Wallets {
    using SafeMath for uint256;
    //
    struct Wallet {
        uint256 balance;
    }
    Roles.Data private roles;
    mapping(address => Wallet) internal wallets;
    address[] private usersArray;

    //
    function _initWallet(address _owner) internal {
        Roles.setRole(roles, _owner, uint256(Roles.Role.Admin));
    }

    //
    function deposit() public payable {
        Wallet memory wallet = wallets[msg.sender];
        wallet.balance = wallet.balance.add(msg.value);
        wallets[msg.sender] = wallet;
    }

    //    
    function addUserWallet(address _user) public {
        require(
            Roles.hasRole(roles, msg.sender,
            uint256(Roles.Role.Admin)),
            "User does not have required role."
        );
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
            Wallet memory wallet = wallets[usersArray[i]];
            totalBalance = totalBalance.add(wallet.balance);
        }
        return totalBalance;
    }
}