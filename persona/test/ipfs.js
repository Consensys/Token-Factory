var ipfs = require('ipfs-js')
ipfs.api = require('ipfs-api')('localhost', '5001')

describe('IPFS', function () {

  it("adds data to IPFS", function(done) {
    var targetHash = 'Qmc7CrwGJvRyCYZZU64aPawPj7CJ56vyBxdhxa38Dh1aKt';
    var targetText = 'Testing...';

    var buf = new Buffer(targetText);
    ipfs.add(buf, function(err, hash) {
      assert.strictEqual(hash, targetHash);
      done();
    });
  });

  it("gets data from IPFS", function(done) {
    var targetHash = 'Qmc7CrwGJvRyCYZZU64aPawPj7CJ56vyBxdhxa38Dh1aKt';
    var targetText = 'Testing...';

    ipfs.cat(targetHash, function(err, data) {
      assert.strictEqual(data.toString(), targetText);
      done();
    });
  });

  it("adds JSON to IPFS", function(done) {
    
    var targetHash = 'QmPhbf5AoE9SF8RUqjCFf15i9ACZ449YTLUFoGnmrs1QZc';
    var jsonObject = {'x' : 1234, 
                      'y' : 'hello',
                      'arr' : [0,1,2,3,4],
                      'obj' : {'a' : 'str', 'b' : 123}};
    
    ipfs.addJson(jsonObject, function(err, hash) {
      assert.strictEqual(hash, targetHash);
      done();
    });
  });

  it("gets JSON from IPFS", function(done) {
    var hash = 'QmPhbf5AoE9SF8RUqjCFf15i9ACZ449YTLUFoGnmrs1QZc';
    var targetObject = {'x' : 1234, 
                        'y' : 'hello',
                        'arr' : [0,1,2,3,4],
                        'obj' : {'a' : 'str', 'b' : 123}};
    
    ipfs.catJson(hash, function(err, jsonObj) {
      assert.strictEqual(jsonObj.x, targetObject.x);
      assert.strictEqual(jsonObj.y, targetObject.y);
      assert.strictEqual(jsonObj.obj.a, targetObject.obj.a);
      assert.strictEqual(jsonObj.obj.b, targetObject.obj.b);

      for (var i=0; i<targetObject.arr.length; i++) {
        assert.strictEqual(jsonObj.arr[i], targetObject.arr[i]);
      }

      done();
    });
  });


})
