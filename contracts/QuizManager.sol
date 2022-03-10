// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title QuizManager
/// @author Roberto Garcìa.
/// @notice Smart Contract for the control of tokens through a survey
contract QuizManager is ERC20, ERC20Burnable, Ownable {

    
    using Counters for Counters.Counter;    
    Counters.Counter private id;    
    uint public frezz = 24 * 1 hours;    
    uint public fee =  1 * 10 ** 18;
    struct Response{
        address owner;
        string data;
        uint datetime;
    }
    
    event LogChangeFee(uint256 newFee, address account);    
    event NewResponse(address account, string response);

    mapping (address=>uint) lastSurveyDate;
    mapping (uint=>Response) responses;
    mapping (address=>uint[]) responsesByOwner;
    constructor() ERC20("QUIZ", "QUIZ") {}

    /// @notice changes the time lag between surveys
    /// @param _hours time in hours
    function changeFrezzTime(uint _hours) 
        public
        onlyOwner
    {
        require(_hours > 0, "Must be greater than zero");
        frezz = _hours * 1 hours;
    }
    /// @notice Update fee   
    /// @param newFee new fee
    function changeFee(uint newFee)
        public
        onlyOwner
    {   
        fee = newFee;
        emit LogChangeFee(newFee, _msgSender());
    }
    /// @dev validates if the user can perform a survey
    /// @return bool boolean status
    function surveyAvailable()
        public 
        view
        returns(bool)
    {
        return block.timestamp > lastSurveyDate[_msgSender()] + frezz ? true  : false;
    }
    /// @notice add responses add state.
    /// @param response survey data.
    /// @return bool boolean status
    function addSurvey(string memory response)
        public 
        returns(bool)    
    {
        require(block.timestamp > lastSurveyDate[_msgSender()] + frezz , " await for new survey");
        
        id.increment();
        
        responses[id.current()] = Response({
            owner: _msgSender(),
            data: response,
            datetime: block.timestamp
        });

        responsesByOwner[_msgSender()].push(id.current());
        lastSurveyDate[_msgSender()] = block.timestamp;

        _mint(_msgSender(), fee);

        emit NewResponse(_msgSender(), response);

        return true;
    }
}