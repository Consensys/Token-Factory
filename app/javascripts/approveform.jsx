var ApproveForm = React.createClass({
  getInitialState: function() {
    return {
      address: '',
      approving: false,
      approvingHash: '',
      toAddress: '',
      approveAmount: 0,
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
    if(this.state.approving == true) {
      for(var i = 0; i < this.props.confirmed.length; i+=1) {
        if(this.props.confirmed[i].receipt.transactionHash == this.state.approvingHash) {
          console.log(this.props.confirmed[i].receipt);
          this.setState({approving: false});
          console.log('approved');
          //signal SENT
          var testC = Standard_Token.at(this.props.contractAddress);
          testC.allowance.call(web3.eth.accounts[0], web3.eth.accounts[1]).then(function(result) {
            console.log('allowance');
            console.log(result);
          });

        }
      }
    } else {
      if(this.props.pending.length > 0) {
        this.setState({approving: true});
        this.setState({approvingHash: this.props.pending[0].receipt.transactionHash});
      } else if (this.props.received.length > 0) {
        this.setState({approving: true});
        this.setState({approvingHash: this.props.received[0].receipt.transactionHash});
      }
    }
  },
  handleAmountChange: function(event) {
    this.setState({approveAmount: event.target.value});
  },
  handleAddressChange: function(event) {
    this.setState({forAddress: event.target.value});
  },
  executeFunction: function() {
    console.log(this.state.approveAmount);
    console.log(this.state.forAddress);

    var tx_hash = this.state.st_ctr.approve(this.state.forAddress, this.state.approveAmount, {from: web3.eth.accounts[0]});

    TXActions.add({hash: tx_hash, txType: "approve"});
    this.setState({approving: true});
    this.setState({approvingHash: tx_hash});
  },
  render: function() {
    //return error if not actual token system.
    //change wording
    return (
      <div>
        Approve Address Some Value: <br />
        <br />
        <input type="text" value={this.state.forAddress} placeholder="eg. 0x1fe" onChange={this.handleAddressChange}/><br />
        <input type="text" value={this.state.approveAmount} placeholder="eg. 10" onChange={this.handleAmountChange}/><br />
        <button disabled={this.state.approving} onClick={this.executeFunction}>Approve Value</button>
      </div>
    );
  }
});
window.ApproveForm = ApproveForm;
