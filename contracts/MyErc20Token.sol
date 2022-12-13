pragma solidity ^0.4.24;
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract MyErc20Token is StandardToken {
    string public name = "MyErc20Token";
    string public symbol = "TKN";
    uint256 public decimals = 18;

    function MyErc20Token(uint initialSupply) public {
        totalSupply_ = initialSupply;
        balances[msg.sender] = initialSupply;
    }
}
