var AllowanceForm = React.createClass({
  getInitialState: function() {
    return {
      ownerAddress: '',
      spenderAddress: '',
      displayedAllowance: '',
    };
  },
  handleOwnerAddressChange: function(event) {
    this.setState({ownerAddress: event.target.value});
  },
  handleSpenderAddressChange: function(event) {
    this.setState({spenderAddress: event.target.value});
  },
  executeFunction: function() {
    //can use the normal Pudding promises, since it just a call, not a full transaction.
    var that = this;
    this.props.pudding_token.allowance.call(this.state.ownerAddress, this.state.spenderAddress, {from: web3.eth.accounts[0]}).then(function(result) {
      console.log(result.c[0]);
      var allowanceToDisplay = <div>{that.state.ownerAddress} (owner) has allowed {that.state.spenderAddress} (spender) to withdraw: {result.c[0]}.</div>;
      that.setState({displayedAllowance: allowanceToDisplay});
    });

  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Check Allowance between 2 addresses: <br />
        <br />
        <input type="text" value={this.state.ownerAddress} placeholder="owner. eg. 0x1fe" onChange={this.handleOwnerAddressChange}/>
        <input type="text" value={this.state.spenderAddress} placeholder="spender. eg. 0x1fe" onChange={this.handleSpenderAddressChange}/>
        {this.state.displayedAllowance  }
        <br />

        <button onClick={this.executeFunction}>Check Allowance</button>

      </div>
    );
  }
});

window.AllowanceForm = AllowanceForm;
