import React from "react";

var InputForm = React.createClass({
  getInitialState: function() {
    return {
      val: '',
    };
  },
  handleChange: function(event) {
    this.setState({val: event.target.value});
  },
  render: function() {
    return (
      <div>
        <input type="text" className="form-control" value={this.state.val} placeholder={this.props.placeholder} onChange={this.handleChange}/><br />
      </div>
    );
  }
});
module.exports = InputForm;
