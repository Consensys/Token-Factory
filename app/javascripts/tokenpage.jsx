var TokenPage = React.createClass({
  getInitialState: function() {
    return {
      address: '',
      transferAmount: 0
    };
  },
  componentDidMount: function() {
    this.setState({address: this.props.params.address});
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Interacting with token at address: {this.state.address}. <br />
        <br />
        Basic Functions: <br />
        <br />
        <TransferForm /> <br />
        <ApproveForm /> <br />
        <BalanceOfForm /> <br />
        Other Functions: <br />
        
      </div>
    );
  }
});

window.TokenPage = TokenPage;
