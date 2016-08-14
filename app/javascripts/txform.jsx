import React from "react";
import InputForm from "./inputform.jsx";
import { TXActions } from 'reflux-tx';

window.txa = TXActions; //debugging

/*
Component for forms to watch creation page & wallet page.
*/

var TxForm = React.createClass({
  getInitialState: function() {
    return {
      processing: false,
      txHash: '',
      txArgs: [],
    };
  },
  componentDidMount: function() {
    /*console.log(HumanStandardToken.prototype);
    console.log(HumanStandardToken.prototype.binary);*/
  },
  componentDidUpdate: function() {
    //first props are passed only after it mounted.
    //has to re-uptake state after a page refresh.
    if(this.state.processing == true) {
      console.log('processing');
      for(var i = 0; i < this.props.received.length; i+=1) {
        console.log('iterating received');
        if(this.props.received[i].receipt.transactionHash == this.state.txHash) {
          console.log(this.props.received[i].receipt);
          this.setState({processing: false});
          console.log('processed');

          //todo: txArgs do NOT persist over page refreshes.
          //this should be shifted to localstorage.
          //for now if txArgs is empty, run success update, but in success funciton, just say "success!" not with details
          //very edge case-y atm, so delay until after alpha.
          this.props.successful(this.state.txArgs, this.props.received[i].receipt); //successful transaction with these arguments
          this.setState({txArgs: []});
        }
      }
    } else {
      if(this.props.pending.length > 0) {
        console.log(this.props.pending);
        this.setState({processing: true});
        //this seems dangerous! Assumes only 1 tx at a time.
        //todo: revise
        this.setState({txHash: "0x" + this.props.pending[0].data.hash});
      }
    }
  },
  submitTransaction: function(tx_hash, tx_type) {
    console.log(tx_hash, tx_type);
    this.setState({processing: true});
    this.setState({txHash: tx_hash});
    TXActions.add({hash: tx_hash, txType: tx_type});
  },
  executeFunction: function() {

    //for now, just collect arguments in order.
    //otherwise do something else (like passing a function as a prop)
    var args = [];
    for(var i = 0; i < this.props.inputs.length; i+=1) {
      args.push(this.refs[this.props.inputs[i].ref].state.val);
    }

    //if in creation page
    if(typeof this.props.web3_token == 'undefined') {
      //token creation execution
      console.log('creating');
      var ST = web3.eth.contract(HumanStandardToken.abi);
      var tx_hash = null;
      var that = this;

      web3.eth.getAccounts(function(err, accounts){
        var addr = accounts[0];
        //TODO: change gas price to be dynamic. Included quicker into a block.
        //args[0] = uint256 _initialAmount,
        //args[1] = string _tokenName,
        //args[2] = uint8 _decimalUnits,
        //args[3] = string _tokenSymbol
        //var creation_data = ST.new.getData(args[0], args[1], args[2], args[3], {from: addr, data: "0x" + HumanStandardToken.prototype.binary, gasPrice: 50000000000, gas: 3100000});

        ST.new(args[0], args[1], args[2], args[3], {from: addr, data: HumanStandardToken.prototype.binary, gasPrice: 20000000000, gas: 1000000}, function(err, result) {
          //NOTE: This callback fires twice. Once tx hash comes in. Then when mined.
          if(err) {
            console.log(err);
          } else {
            if(result != null) {
              if(!result.address) {
                console.log("submitting");
                tx_hash = result;
                console.log(tx_hash);
                that.submitTransaction(tx_hash.transactionHash, that.props.txType);
              }
            }
          }
        });
      });


    } else {
      //if normal interaction with token.
      if(this.props.txStyle == "call") {
        //pushing callback into the args
        var that = this;
        args.push(function(err, result) {
          if(!err) {
            console.log(result);
            that.props.successful(result, args); //fires callback function.
          }
        });
        var result = this.props.web3_token[this.props.abiFunction].call.apply(this, args);
      }
      else if(this.props.txStyle == "transaction") {
        var that = this;
        args.push({gas: 300000}); //TODO: change to estimateGas
        web3.eth.getAccounts(function(err, accounts){
          var addr = accounts[0];
          args.push({from: addr});

          //pushing callback into the args
          args.push(function(err, result) {
            if(!err) {
              console.log(result);
              if(result != null) {
                var tx_hash = result;
                that.setState({txArgs: args}); //need to keep transaction arguments for success function.
                that.submitTransaction(tx_hash, that.props.txType);
              }
            }
          });

          console.log(args);
          that.props.web3_token[that.props.abiFunction].sendTransaction.apply(that, args);
        });
      }
    }
  },
  render: function() {
    if(this.state.processing) {
      var buttonMessage = <span><i className="fa fa-circle-o-notch fa-spin"></i> {this.props.buttonProcessing}. Awaiting Confirmation </span>;
    } else {
      var buttonMessage = this.props.buttonAction;
    }

    return (
      <div>
        <h3>{this.props.header}</h3>
        {this.props.msg}<br />
        <br />
        {this.props.inputs.map(function (result) {
          return <InputForm key={result.key} ref={result.ref} placeholder={result.placeholder} />
        })}
        <button className="btn btn-default" disabled={this.state.processing} onClick={this.executeFunction}>{buttonMessage}</button>
      </div>
    );
  }
});
module.exports = TxForm;
