import React from "react";
import InputForm from "./inputform.jsx";

var TxForm = React.createClass({
  getInitialState: function() {
    return {
      processing: false,
      txHash: '',
      txArgs: {},
    };
  },
  componentDidUpdate: function() {
    //first props are passed only after it mounted.
    //has to re-uptake state after a page refresh.
    if(this.state.processing == true) {
      for(var i = 0; i < this.props.confirmed.length; i+=1) {
        if(this.props.confirmed[i].receipt.transactionHash == this.state.txHash) {
          console.log(this.props.confirmed[i].receipt);
          this.setState({processing: false});
          console.log('processed');
          this.props.successful(this.state.txArgs, this.props.confirmed[i].receipt); //successful transaction with these arguments
        }
      }
    } else {
      if(this.props.pending.length > 0) {
        this.setState({processing: true});
        //this seems dangerous! Assumes only 1 tx at a time.
        //revise
        this.setState({txHash: this.props.pending[0].receipt.transactionHash});
      } else if (this.props.received.length > 0) {
        this.setState({processing: true});
        this.setState({txHash: this.props.received[0].receipt.transactionHash});
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

    var addr = AccountStore.getSelectedAddress();
    args.push({from: addr, gas: 3000000}); //push lightwallet eventually.

    if(typeof this.props.web3_token == 'undefined') {
      //token creation execution
      console.log('creating');
      var ST = web3.eth.contract(Standard_Token.abi);
      var tx_hash = null;
      var that = this;
      //var creation_data = ST.new.getData(args[0], {data: Standard_Token.binary});
      ST.new(args[0], {from: addr, data: "0x"+Standard_Token.binary, gas: 3100000}, function(err, result) {
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

    } else {
      //if normal interaction with token.
      if(this.props.txStyle == "call") {
        var result = this.props.web3_token[this.props.abiFunction].call.apply(this, args);
        this.props.successful(result, args); //fires callback function.
      }
      else if(this.props.txStyle == "transaction") {
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
        var that = this;
        this.props.web3_token[this.props.abiFunction].sendTransaction.apply(this, args);
      }
    }
  },
  render: function() {
    if(this.state.processing) {
      var buttonMessage = <span> {this.props.buttonProcessing}. Awaiting Confirmation </span>;
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
