var ApproveForm = React.createClass({
  getInitialState: function() {
    return {
      address: '',
      value: 0
    };
  },
  componentDidMount: function() {
  },
  handleValueChange: function(event) {
    this.setState({value: event.target.value});
  },
  handleAddressChange: function(event) {
    this.setState({address: event.target.value});
  },
  executeFunction: function() {
    console.log(this.state.value);
    console.log(this.state.address);
  },
  render: function() {
    //return error if not actual token system.
    //change wording
    return (
      <div>
        Approve Address Some Value: <br />
        <br />
        <input type="text" value={this.state.address} placeholder="eg. 0x1fe" onChange={this.handleAddressChange}/><br />
        <input type="text" value={this.state.value} placeholder="eg. 10" onChange={this.handleValueChange}/><br />
        <button onClick={this.executeFunction}>Approve Value</button>
      </div>
    );
  }
});
window.ApproveForm = ApproveForm;
