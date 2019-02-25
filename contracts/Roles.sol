pragma solidity ^0.5.0;

library Roles {
    //
    enum Role { None, Owner, Admin, Regist }
    struct Data {
        mapping(address => Role) roles;
    }

    //
    function setRole(Data storage self, address _user, uint256 _role) public returns(bool) {
        if (self.roles[_user] == Role(_role)) {
            return false; // already there
        }
        self.roles[_user] = Role(_role);
        return true;
    }

    //
    function hasRole(Data storage self, address _user, uint256 _role) public view returns(bool) {
        return (self.roles[_user] != Role.None && self.roles[_user] <= Role(_role));
    }
}