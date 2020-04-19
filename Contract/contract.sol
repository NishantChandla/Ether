pragma solidity ^0.4.17;

contract Donations{
    address[] public donators;
    uint public minContribution;
    address public manager;

    function Donations(uint min, address manage) public{
        minContribution = min;
        manager=manage;
    }
    function contribute() public payable{
        require(msg.value >minContribution);
        donators.push(msg.sender);


    }

    function request(address shopkeeper,uint amount) public{
        require(msg.sender == manager);

        shopkeeper.transfer(amount);




    }
    function balance() public view returns (uint){
        return address(this).balance;
    }


}

