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
        Enter Address of Token System: <br />
          <input type="text" value={this.state.value} placeholder="0xdeadbeef..." onChange={this.handleChange}/>
          <button onClick={this.executeFunction}>Go to Token</button>
      </div>
    );
  },
  executeFunction: function() {
    console.log(this.state.value);
    this.props.history.pushState(null,'/token/'+this.state.value);
  }
});

window.TokenSearchPage = TokenSearchPage;
