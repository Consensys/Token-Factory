
contract Persona {
  address public owner;
}

contract PersonaRegistry {

  mapping(address => address) public idLookup;
  address[] public idList;
  uint public version;

  function PersonaRegistry() {
    version = 0;
    idList.length = 0;
  }

  function registerPersona(address contractAddress) {
    Persona p = Persona(contractAddress);
    address _owner = p.owner();

    if (_owner == msg.sender) {
      
      if (idLookup[_owner] == 0) {
        idList.length++;
        idList[idList.length-1] = _owner;
      }

      idLookup[_owner] = contractAddress;
      
    }
  }
  
  function getIdList() returns (address[]){
    return idList;
  }

  function removePersona() {
    if (idLookup[msg.sender] != 0) {
      Persona p = Persona(idLookup[msg.sender]);
      idLookup[msg.sender] = 0;
    }

    for(uint i = 0; i < idList.length; i++) {
      if(idList[i] == msg.sender) {
        idList[i] = idList[idList.length-1];
        idList.length--;
      }
    }

  }

}
