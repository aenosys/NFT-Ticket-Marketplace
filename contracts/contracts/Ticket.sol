// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Ticket is ERC721URIStorage, Ownable, IERC721Receiver{
    
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    
    using SafeMath for uint256;
    
    address payable public _owner;
    mapping(uint256 => uint256) public prices;
    mapping(uint256 => bool) public sold;
    mapping(uint256 => bool) public onSale;
    
    event Mint(uint256 id, uint256 price, string tokenUri, address owner);
    event Buy(address buyer, uint256 price, uint256 id, string uri);
    event Sale(address buyer, uint256 price, uint256 id, string uri);
    
    constructor() ERC721("Ticket", "TKT") {
        _owner = payable(msg.sender);
    }
    
    
    function mintToken(string memory uri, uint256 _price) public onlyOwner {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        prices[newItemId] = _price;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, uri);
        
        emit Mint(newItemId, _price, uri, msg.sender);
    }
    
    function burn(uint256 tokenId) public onlyOwner returns (bool) {
        _burn(tokenId);
        return true;
    }
    
    function putOnSale(uint256 _id) public {
        require(msg.sender == ownerOf(_id), "Sender should be the owner of the id");
        sold[_id] = false;
        onSale[_id] = true;
    }
    
    function buy(uint256 _id) public payable {
        require(msg.sender != ownerOf(_id), "Seller cannot be the buyer");
        require(_exists(_id), "Error, wrong Token id");
        require(msg.value == prices[_id],"Error, Token costs should be equal");
        
        uint256 percentage = 5;
        uint256 calculatedFees = prices[_id].mul(percentage).div(100);
        uint256 totalAmount = msg.value.sub(calculatedFees);
        payable(address(0x583031D1113aD414F02576BD6afaBfb302140225)).transfer(calculatedFees);
        payable(ownerOf(_id)).transfer(totalAmount);
        sold[_id] = true;
        onSale[_id] = false;
        _transfer(ownerOf(_id), msg.sender, _id);
        
        emit Buy(msg.sender, prices[_id], _id, tokenURI(_id));
    }
    
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}