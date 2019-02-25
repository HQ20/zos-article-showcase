pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20.sol";
import "./Roles.sol";
import "./Wallets.sol";

contract MyContract is ERC20, Wallets {
    //
    string public publicMessage;

    //
    struct Whom {
        bytes32 username;
        uint8 age;
    }
    mapping(address => Whom) private whoms;
    address[] private whomArray;

    //
    function initialize(
        string memory _msg,
        address _initWalletOwner
    ) 
        public
        initializer 
    {
        publicMessage = _msg;
        _initWallet(_initWalletOwner);
    }

    //
    function deposit() public payable {
        Wallet memory wallet = wallets[msg.sender];
        wallet.balance = wallet.balance.add(msg.value);
        wallet.deposits = wallet.deposits.add(1);
        wallets[msg.sender] = wallet;
        _mint(msg.sender, msg.value);
    }

    //
    function addExtraInfo(bytes32 _username, uint8 _age) public {
        require(isValidWallet(msg.sender), "The current wallet is not in the system.");
        Whom memory whom;
        whom.username = _username;
        whom.age = _age;
        whoms[msg.sender] = whom;
        whomArray.push(msg.sender);
    }
}