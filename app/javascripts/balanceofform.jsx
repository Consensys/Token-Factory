var BalanceOfForm = React.createClass({
  getInitialState: function() {
    return {
      address: '',
      transferAmount: 0
    };
  },
  componentDidMount: function() {
  },
  handleAddressChange: function(event) {
    this.setState({address: event.target.value});
  },
  executeFunction: function() {
    console.log(this.state.address);
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Check Balance of Address: <br />
        <br />
        <input type="text" value={this.state.address} placeholder="eg. 0x1fe" onChange={this.handleAddressChange}/><br />
        <button onClick={this.executeFunction}>Check Balance</button>
      </div>
    );
  }
});

window.BalanceOfForm = BalanceOfForm;
