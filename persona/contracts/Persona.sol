contract Persona {
  address public owner;

  string public ipfsHash;

  // For versioning
  uint public version;

  // For revocation/upgrading/migration
  bool public isRevoked;
  uint public revocationTimestamp;
  
  modifier ownerNonRevoked { if (msg.sender == owner && !isRevoked) _ }

  function Persona(string _ipfsHash) {
    owner = msg.sender;
    ipfsHash = _ipfsHash;
    version = 0;
    isRevoked = false;
    revocationTimestamp = 0;
  }

  function setIpfsHash(string _ipfsHash) ownerNonRevoked {
    ipfsHash = _ipfsHash;
  }

  function revoke() ownerNonRevoked {
    isRevoked = true;
    revocationTimestamp = block.timestamp;
  }

}
