var TransferForm = React.createClass({
  getInitialState: function() {
    return {
      toAddress: '',
      transferAmount: 0,
      st_ctr: ''
    };
  },
  componentDidMount: function() {
    var create_st_ctr = Standard_Token.at(this.props.address);
    this.setState({st_ctr: create_st_ctr});
  },
  handleAmountChange: function(event) {
    this.setState({transferAmount: event.target.value});
  },
  handleAddressChange: function(event) {
    this.setState({address: event.target.value});
  },
  executeFunction: function() {
    console.log(this.state.transferAmount);
    console.log(this.state.toAddress);

    var comp = this;
    this.state.st_ctr.transfer(web3.eth.accounts[1], 10, {from: web3.eth.accounts[0]}).then(function(result) {
      return comp.state.st_ctr.balanceOf.call(web3.eth.accounts[1]);
    }).then(function (result) {
      console.log(result);
    });
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Transfer: <br />
        <br />
        <input type="text" value={this.state.transferAmount} placeholder="eg. 10" onChange={this.handleAmountChange}/><br />
        <input type="text" value={this.state.toAddress} placeholder="eg. 0x1fe" onChange={this.handleAddressChange}/><br />
        <button onClick={this.executeFunction}>Transfer</button>
      </div>
    );
  }
});

window.TransferForm = TransferForm;
