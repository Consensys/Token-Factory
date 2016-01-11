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
    TXActions.add({hash: tx_hash, txType: tx_type});
    this.setState({processing: true});
    this.setState({txHash: tx_hash});
  },
  executeFunction: function() {

    //for now, just collect arguments in order.
    //otherwise do something else (like passing a function as a prop)
    args = [];
    for(var i = 0; i < this.props.inputs.length; i+=1) {
      args.push(this.refs[this.props.inputs[i].ref].state.val);
    }

    args.push({from: AccountStore.getSelectedAddress()}); //push lightwallet eventually.

    console.log(this.props.web3_token);
    console.log('propping');
    console.log(this.props);
    if(typeof this.props.web3_token == 'undefined') {
      //token creation execution
      console.log('creating');
      var ST = web3_rab.eth.contract(Standard_Token.abi);
      var tx_hash = null;
      var addr = AccountStore.getSelectedAddress();
      console.log(addr);
      var that = this;
      ST.new(args[0], {from: addr, data: Standard_Token.binary}, function(err, result) {
        //NOTE: This callback fires twice. Once tx hash comes in. Then when mined.
        if(err) {
          console.log(err);
        } else {
          console.log(result);
          if(result != null) {
            console.log("submitting");
            tx_hash = result;
            that.submitTransaction(tx_hash.transactionHash, that.props.txType);
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
window.TxForm = TxForm;
