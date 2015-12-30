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
        <input type="text" value={this.state.val} placeholder={this.props.placeholder} onChange={this.handleChange}/><br />
      </div>
    );
  }
});
window.InputForm = InputForm;
