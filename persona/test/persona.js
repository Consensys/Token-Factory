
contract('Persona', function(acct) {

  var ipfsHash = 'QmYk9cwLQSnNJjLnHUbiRSoKmuJbZGPt8tXVR2q5Ugi1eD';

  it("should construct properly", function(done) {
    Persona.new(ipfsHash).then(function (persona) {
      persona.owner.call().then(function (owner) {
        assert.strictEqual(owner, acct[0]);
        return persona.ipfsHash.call();
      }).then( function(outIpfsHash) {
        assert.strictEqual(outIpfsHash, ipfsHash);
        done();
      });
    });
  });

  it("should set ipfsHash correctly", function(done) {
    Persona.new(ipfsHash).then(function (persona) {
      var newIpfsHash = 'QmbcuVvbtWZxCv4MQZuzZnyviAhsXNm2kRt53iS7ZWZTh7'
      persona.setIpfsHash(newIpfsHash).then( function() {
        return persona.ipfsHash.call();
      }).then( function (retIpfsHash) {
        assert.strictEqual(retIpfsHash, newIpfsHash);
        done();
      });    
    });
  });

});
