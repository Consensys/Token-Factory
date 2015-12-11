var TransferForm = React.createClass({
  getInitialState: function() {
    return {
      address: '',
      transferAmount: 0
    };
  },
  componentDidMount: function() {
  },
  handleAmountChange: function(event) {
    this.setState({transferAmount: event.target.value});
  },
  handleAddressChange: function(event) {
    this.setState({address: event.target.value});
  },
  executeFunction: function() {
    console.log(this.state.transferAmount);
    console.log(this.state.address);
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Transfer: <br />
        <br />
        <input type="text" value={this.state.transferAmount} placeholder="eg. 10" onChange={this.handleAmountChange}/><br />
        <input type="text" value={this.state.address} placeholder="eg. 0x1fe" onChange={this.handleAddressChange}/><br />
        <button onClick={this.executeFunction}>Transfer</button>
      </div>
    );
  }
});

window.TransferForm = TransferForm;
