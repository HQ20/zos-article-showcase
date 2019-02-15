pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20.sol";
import "./Roles.sol";
import "./Wallets.sol";

contract MyContract is ERC20, Wallets {

    struct What {
        address wallet;
        bytes32 username;
        uint8 age;
    }
    mapping(address => What) private whats;

    string public s;
    uint256 public x;
    address[] private whomArray;

    function initialize(
        uint256 _x,
        string memory _s
    ) 
        public
        initializer 
    {
        x = _x;
        s = _s;
    }

    //
    function deposit() public payable {
        Wallet memory wallet = wallets[msg.sender];
        wallet.balance = wallet.balance.add(msg.value);
        wallet.deposits = wallet.deposits + 1;
        wallets[msg.sender] = wallet;
        _mint(msg.sender, msg.value);
    }

    //
    function signUp(bytes32 _username, uint8 _age) public {
        What memory who;
        who.username = _username;
        who.age = _age;
        whats[msg.sender] = who;
        whomArray.push(msg.sender);
    }

    //
    function connectAccountToWallet(address _wallet) public {
        What memory who = whats[msg.sender];
        who.wallet = _wallet;
        whats[msg.sender] = who;
    }
}