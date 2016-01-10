
contract('PersonaRegistry', function(acct) {

  var ipfsHash = 'QmYk9cwLQSnNJjLnHUbiRSoKmuJbZGPt8tXVR2q5Ugi1eD';
  var ipfsHash2 = 'QmYk9cwLQSnNJjLnHUbiRSoKmuJbZGPt8tXVR2q5Ugi1eU';

  it("should register and remove an address", function(done) {
    this.timeout(10000);
    var idList, persona2;

    PersonaRegistry.new().then(function (reg) {
      Persona.new(ipfsHash).then(function (persona) {
        reg.registerPersona(persona.address).then(function () {
          return reg.idLookup.call(acct[0]);
        }).then(function(returnedAddr) {
          assert.strictEqual(returnedAddr, persona.address);
          return reg.getIdList.call();
        }).then(function (i) {
          idList = i;
          assert.strictEqual(idList.length, 1);
          assert.strictEqual(idList[0], acct[0]);
          return Persona.new(ipfsHash, {from: acct[1]});
        }).then(function (p) {
          persona2 = p;
          return reg.registerPersona(persona2.address, {from: acct[1]})
        }).then(function () {
          return reg.idLookup.call(acct[1]);
        }).then(function (returnedAddr2) {
          assert.strictEqual(returnedAddr2, persona2.address);
          return reg.getIdList.call();
        }).then(function (idList2) {
          assert.strictEqual(idList2.length, 2);
          assert.strictEqual(idList2[0], acct[0]);
          assert.strictEqual(idList2[1], acct[1]);
          return reg.removePersona({from: acct[0]});
        }).then(function () {
          return reg.getIdList.call();
        }).then( function (idList) {
          assert.strictEqual(idList.length, 1);
          assert.strictEqual(idList[0], acct[1]);
          done();
        }).catch(done);
      })
    })
  });

})
