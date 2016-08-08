import React from "react";

/*
Simple forwarding tool to simply forward to a token page when putting in an address so the user don't have to fiddle with the URL.
*/

var TokenSearchPage = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    }
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div>
        Enter the address of the token contract you want to interact with: <br />
        <br />
        <input className="form-control" type="text" value={this.state.value} placeholder="0x1ceb00da..." onChange={this.handleChange}/>
        <br />
        <button className="btn btn-default" onClick={this.executeFunction}>Go to Token</button>
      </div>
    );
  },
  executeFunction: function() {
    console.log(this.state.value);
    this.props.history.pushState(null,'/token/'+this.state.value);
  }
});

module.exports = TokenSearchPage;
