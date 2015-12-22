var TransferFromForm = React.createClass({
  getInitialState: function() {
    return {
      transferring: false,
      transferHash: '',
      toAddress: '',
      transferAmount: 0,
    };
  },
  componentDidUpdate: function() {
    //first props are passed only after it mounted.
    if(this.state.transferring == true) {
      for(var i = 0; i < this.props.confirmed.length; i+=1) {
        if(this.props.confirmed[i].receipt.transactionHash == this.state.transferringHash) {
          console.log(this.props.confirmed[i].receipt);
          this.setState({transferring: false});
          //signal SENT
          console.log('transferred');
        }
      }
    } else {
      if(this.props.pending.length > 0) {
        this.setState({transferring: true});
        this.setState({transferringHash: this.props.pending[0].receipt.transactionHash});
      } else if (this.props.received.length > 0) {
        this.setState({transferring: true});
        this.setState({transferringHash: this.props.received[0].receipt.transactionHash});
      }
    }
  },
  handleAmountChange: function(event) {
    this.setState({transferAmount: event.target.value});
  },
  handleFromAddressChange: function(event) {
    this.setState({fromAddress: event.target.value});
  },
  handleToAddressChange: function(event) {
    this.setState({toAddress: event.target.value});
  },
  executeFunction: function() {

    //before executing, check if allowed.
    //check validity of inputs
    var tx_hash = this.props.web3_token.transferFrom(this.state.fromAddress, this.state.toAddress, this.state.transferAmount, {from: web3.eth.accounts[1]});

    TXActions.add({hash: tx_hash, txType: "transferFrom"});
    this.setState({transferring: true});
    this.setState({transferringHash: tx_hash});
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Transfer From: <br />
        <br />
        <input type="text" value={this.state.fromAddress} placeholder="from: eg. 0x1fe" onChange={this.handleFromAddressChange}/><br />
        <input type="text" value={this.state.toAddress} placeholder="to: eg. 0x1fe" onChange={this.handleToAddressChange}/><br />
        <input type="text" value={this.state.transferAmount} placeholder="eg. 10" onChange={this.handleAmountChange}/><br />
        <button disabled={this.state.transferring} onClick={this.executeFunction}>Transfer From</button>
      </div>
    );
  }
});

window.TransferFromForm = TransferFromForm;
