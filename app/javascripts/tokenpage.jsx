var TokenPage = React.createClass({
  getInitialState: function() {
    return {
      address: ''
    };
  },
  componentDidMount: function() {
    this.setState({address: this.props.params.address});
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Interacting with token at address: {this.state.address}.

        [insert form here]
      </div>
    );
  }
});

window.TokenPage = TokenPage;
