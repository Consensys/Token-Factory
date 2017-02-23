var MeshStandardToken = artifacts.require("./MeshStandardToken.sol");
var SampleRecipientSuccess = artifacts.require("./test/SampleRecipientSuccess.sol");

contract("MeshStandardToken", function(accounts) {

//CREATION

    it("creation: should create an initial balance of 10000 for the creator", function(done) {
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(ctr) {
            return ctr.balanceOf.call(accounts[3]);
    }).then(function (result) {
        assert.strictEqual(result.toNumber(), 10000);
        done();
        }).catch(done);
    });

    it("creation: test correct setting of vanity information", function(done) {
      var ctr;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.name.call();
    }).then(function (result) {
        assert.strictEqual(result, 'Mesh Bucks');
        return ctr.decimals.call();
    }).then(function(result) {
        assert.strictEqual(result.toNumber(), 1);
        return ctr.symbol.call();
    }).then(function(result) {
        assert.strictEqual(result, 'MBX');
        done();
        }).catch(done);
    });

    it("creation: should succeed in creating over 2^256 - 1 (max) tokens", function(done) {
        //2^256 - 1
        MeshStandardToken.new('115792089237316195423570985008687907853269984665640564039457584007913129639935', 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(ctr) {
            return ctr.totalSupply();
    }).then(function (result) {
        var match = result.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77');
        assert.isTrue(match);
        done();
        }).catch(done);
    });

//TRANSERS
//normal transfers without approvals.

    //this is not *good* enough as the contract could still throw an error otherwise.
    //ideally one should check balances before and after, but estimateGas currently always throws an error.
    //it's not giving estimate on gas used in the event of an error.
    it("transfers: ether transfer should be reversed.", function(done) {
        var ctr;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return web3.eth.sendTransaction({from: accounts[3], to: ctr.address, value: web3.toWei("10", "Ether")});
        }).catch(function(result) {
            done();
        }).catch(done);
    });


    it("transfers: should transfer 10000 to accounts[4] with accounts[3] having 10000", function(done) {
        var ctr;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.transfer(accounts[4], 10000, {from: accounts[3]});
        }).then(function (result) {
            return ctr.balanceOf.call(accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 10000);
            done();
        }).catch(done);
    });

    it("transfers: should fail when trying to transfer 10001 to accounts[4] with accounts[3] having 10000", function(done) {
        var ctr;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.transfer.call(accounts[4], 10001, {from: accounts[3]});
        }).then(function (result) {
            assert.isFalse(result);
            done();
        }).catch(done);
    });

    it("transfers: should fail when trying to transfer zero.", function(done) {
        var ctr;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.transfer.call(accounts[4], 0, {from: accounts[3]});
        }).then(function (result) {
            assert.isFalse(result);
            done();
        }).catch(done);
    });

    //NOTE: testing uint256 wrapping is impossible in this standard token since you can't supply > 2^256 -1.

    //todo: transfer max amounts.

//APPROVALS

    it("approvals: msg.sender should approve 100 to accounts[4]", function(done) {
        var ctr = null;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.approve(accounts[4], 100, {from: accounts[3]});
        }).then(function (result) {
            return ctr.allowance.call(accounts[3], accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 100);
            done();
        }).catch(done);
    });

    it("approvals: msg.sender should approve 100 to SampleRecipient and then NOTIFY SampleRecipient. It should succeed.", function(done) {
        var ctr = null;
        var sampleCtr = null
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return SampleRecipientSuccess.new({from: accounts[3]});
        }).then(function(result) {
            sampleCtr = result;
            return ctr.approveAndCall(sampleCtr.address, 100, '0x42', {from: accounts[3]});
        }).then(function (result) {
            return ctr.allowance.call(accounts[3], sampleCtr.address);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 100);
            return sampleCtr.value.call();
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 100);
            done();
        }).catch(done);
    });

    it("approvals: msg.sender should approve 100 to SampleRecipient and then NOTIFY SampleRecipient and throw.", function(done) {
        var ctr = null;
        var sampleCtr = null
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return SampleRecipientThrow.new({from: accounts[3]});
        }).then(function(result) {
            sampleCtr = result;
            return ctr.approveAndCall.call(sampleCtr.address, 100, '0x42', {from: accounts[3]});
        }).catch(function (result) {
            //It will catch OOG.
            done();
        }).catch(done)
    });

    //bit overkill. But is for testing a bug
    it("approvals: msg.sender approves accounts[4] of 100 & withdraws 20 once.", function(done) {
        var ctr = null;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.balanceOf.call(accounts[3]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 10000);
            return ctr.approve(accounts[4], 100, {from: accounts[3]});
        }).then(function (result) {
            return ctr.balanceOf.call(accounts[5]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 0);
            return ctr.allowance.call(accounts[3], accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 100);
            return ctr.transferFrom.call(accounts[3], accounts[5], 20, {from: accounts[4]});
        }).then(function (result) {
            return ctr.transferFrom(accounts[3], accounts[5], 20, {from: accounts[4]});
        }).then(function (result) {
            return ctr.allowance.call(accounts[3], accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 80);
            return ctr.balanceOf.call(accounts[5]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 20);
            return ctr.balanceOf.call(accounts[3]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 9980);
            done();
        }).catch(done);
    });

    //should approve 100 of msg.sender & withdraw 50, twice. (should succeed)
    it("approvals: msg.sender approves accounts[4] of 100 & withdraws 20 twice.", function(done) {
        var ctr = null;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.approve(accounts[4], 100, {from: accounts[3]});
        }).then(function (result) {
            return ctr.allowance.call(accounts[3], accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 100);
            return ctr.transferFrom(accounts[3], accounts[5], 20, {from: accounts[4]});
        }).then(function (result) {
            return ctr.allowance.call(accounts[3], accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 80);
            return ctr.balanceOf.call(accounts[5]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 20);
            return ctr.balanceOf.call(accounts[3]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 9980);
            //FIRST tx done.
            //onto next.
            return ctr.transferFrom(accounts[3], accounts[5], 20, {from: accounts[4]});
        }).then(function (result) {
            return ctr.allowance.call(accounts[3], accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 60);
            return ctr.balanceOf.call(accounts[5]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 40);
            return ctr.balanceOf.call(accounts[3]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 9960);
            done();
        }).catch(done);
    });

    //should approve 100 of msg.sender & withdraw 50 & 60 (should fail).
    it("approvals: msg.sender approves accounts[4] of 100 & withdraws 50 & 60 (2nd tx should fail)", function(done) {
        var ctr = null;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.approve(accounts[4], 100, {from: accounts[3]});
        }).then(function (result) {
            return ctr.allowance.call(accounts[3], accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 100);
            return ctr.transferFrom(accounts[3], accounts[5], 50, {from: accounts[4]});
        }).then(function (result) {
            return ctr.allowance.call(accounts[3], accounts[4]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 50);
            return ctr.balanceOf.call(accounts[5]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 50);
            return ctr.balanceOf.call(accounts[3]);
        }).then(function (result) {
            assert.strictEqual(result.toNumber(), 9950);
            //FIRST tx done.
            //onto next.
            return ctr.transferFrom.call(accounts[3], accounts[5], 60, {from: accounts[4]});
        }).then(function (result) {
            assert.isFalse(result);
            done();
        }).catch(done);
    });

    it("approvals: attempt withdrawal from acconut with no allowance (should fail)", function(done) {
        var ctr = null;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.transferFrom.call(accounts[3], accounts[5], 60, {from: accounts[4]});
        }).then(function (result) {
              assert.isFalse(result);
              done();
        }).catch(done);
    });

    it("approvals: allow accounts[4] 100 to withdraw from accounts[3]. Withdraw 60 and then approve 0 & attempt transfer.", function(done) {
        var ctr = null;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.approve(accounts[4], 100, {from: accounts[3]});
        }).then(function (result) {
            return ctr.transferFrom(accounts[3], accounts[5], 60, {from: accounts[4]});
        }).then(function (result) {
            return ctr.approve(accounts[4], 0, {from: accounts[3]});
        }).then(function (result) {
            return ctr.transferFrom.call(accounts[3], accounts[5], 10, {from: accounts[4]});
        }).then(function (result) {
              assert.isFalse(result);
              done();
        }).catch(done);
    });

    it("approvals: approve max (2^256 - 1)", function(done) {
        var ctr = null;
        MeshStandardToken.new(10000, 'Mesh Bucks', 1, 'MBX', {from: accounts[3]}).then(function(result) {
            ctr = result;
            return ctr.approve(accounts[4],'115792089237316195423570985008687907853269984665640564039457584007913129639935' , {from: accounts[3]});
        }).then(function (result) {
            return ctr.allowance(accounts[3], accounts[4]);
        }).then(function (result) {
            var match = result.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77');
            assert.isTrue(match);
            done();
        }).catch(done);
    });

});
