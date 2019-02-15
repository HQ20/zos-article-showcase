pragma solidity ^0.5.0;

library Roles {
    //
    enum Role { Owner, Admin, Regist }
    struct Data {
        mapping(address => uint256) roles;
    }

    //
    function setRole(Data storage self, address _user, Role _role) public returns(bool) {
        if (self.roles[_user] == uint256(_role)) {
            return false; // already there
        }
        self.roles[_user] = uint256(_role);
        return true;
    }

    //
    function transferRole(Data storage self, address _from, address _to) public returns(bool) {
        if (self.roles[_to] == self.roles[_from]) {
            return false; // already has that role
        }
        self.roles[_to] = self.roles[_from];
        self.roles[_from] = 0;
        return true;
    }

    //
    function hasRole(Data storage self, address _user, Role _role) public view returns(bool) {
        return (self.roles[_user] <= uint256(_role));
    }
}