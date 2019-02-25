pragma solidity ^0.5.0;

import "../Roles.sol";

contract MockRoles {
    //
    Roles.Data private roles;

    //
    function setRole(address _user, uint256 _role) public returns(bool) {
        return Roles.setRole(roles, _user, _role);
    }

    //
    function hasRole(address _user, uint256 _role) public view returns(bool) {
        return Roles.hasRole(roles, _user, _role);
    }
}