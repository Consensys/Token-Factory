//might not be needed, so leave out for now.
//due to changes in standards.
var UnapproveForm = React.createClass({
  getInitialState: function() {
    return {
      address: '',
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
        Unapprove Address: <br />
        <br />
        <input type="text" value={this.state.address} placeholder="eg. 0x1fe" onChange={this.handleAddressChange}/><br />
        <button onClick={this.executeFunction}>Unapprove</button>
      </div>
    );
  }
});

window.UnapproveForm = UnapproveForm;
