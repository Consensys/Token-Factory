var TransferForm = React.createClass({
  getInitialState: function() {
    return {
      transferring: false,
      transferHash: '',
      toAddress: '',
      transferAmount: 0,
      st_ctr: ''
    };
  },
  componentDidMount: function() {
    var create_st_ctr = web3.eth.contract(Standard_Token.abi);
    var st_ctrr = create_st_ctr.at(this.props.contractAddress);
    this.setState({st_ctr: st_ctrr});
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
          var testC = Standard_Token.at(this.props.contractAddress);
          testC.balanceOf.call(web3.eth.accounts[1]).then(function(result) {
            console.log('balance');
            console.log(result);
          });
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
  handleAddressChange: function(event) {
    this.setState({toAddress: event.target.value});
  },
  executeFunction: function() {
    console.log(this.state.transferAmount);
    console.log(this.state.toAddress);

    //check validity of inputs
    var tx_hash = this.state.st_ctr.transfer(this.state.toAddress, this.state.transferAmount, {from: web3.eth.accounts[0]});

    TXActions.add({hash: tx_hash, txType: "transfer"});
    this.setState({transferring: true});
    this.setState({transferringHash: tx_hash});
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Transfer: <br />
        <br />
        <input type="text" value={this.state.transferAmount} placeholder="eg. 10" onChange={this.handleAmountChange}/><br />
        <input type="text" value={this.state.toAddress} placeholder="eg. 0x1fe" onChange={this.handleAddressChange}/><br />
        <button disabled={this.state.transferring} onClick={this.executeFunction}>Transfer</button>
      </div>
    );
  }
});

window.TransferForm = TransferForm;
