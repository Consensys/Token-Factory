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
    if(this.state.processing == true) {
      for(var i = 0; i < this.props.confirmed.length; i+=1) {
        if(this.props.confirmed[i].receipt.transactionHash == this.state.txHash) {
          console.log(this.props.confirmed[i].receipt);
          this.setState({processing: false});
          console.log('processed');
          this.props.successful(this.state.txArgs); //successful transaction with these arguments
        }
      }
    } else {
      if(this.props.pending.length > 0) {
        this.setState({processing: true});
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
    console.log(this);
    for(var i = 0; i < this.props.inputs.length; i+=1) {
      args.push(this.refs[this.props.inputs[i].ref].state.val);
    }

    args.push({from: web3.eth.accounts[0]}); //push lightwallet eventually.

    if(this.props.txStyle == "call") {
      var result = this.props.web3_token[this.props.abiFunction].call.apply(this, args);
      this.props.successful(result, args); //fires callback function.
    }
    else if(this.props.txStyle == "transaction") {
      var tx_hash = this.props.web3_token[this.props.abiFunction].sendTransaction.apply(this, args);
      console.log(tx_hash);
      this.setState({txArgs: args}); //need to keep transaction arguments for success function.
      this.submitTransaction(tx_hash, this.props.txType);
    }
  },
  render: function() {
    return (
      <div>
        <h3>{this.props.header}</h3>
        {this.props.msg}<br />
        <br />
        {this.props.inputs.map(function (result) {
          return <InputForm key={result.key} ref={result.ref} placeholder={result.placeholder} />
        })}
        <button disabled={this.state.processing} onClick={this.executeFunction}>{this.props.buttonAction}</button>
      </div>
    );
  }
});
window.TxForm = TxForm;
