pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20.sol";
import "./Roles.sol";
import "./Wallets.sol";

contract MyContract is ERC20, Wallets {
    //
    string public publicMessage;

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
}