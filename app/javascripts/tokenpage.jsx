var TokenPage = React.createClass({
  getInitialState: function() {
    //abi is at Standard_Token.abi.
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
        <TransferForm address = {this.props.params.address} /> <br />
        <ApproveForm /> <br />
        <UnapproveForm /> <br />
        <BalanceOfForm /> <br />
        Other Functions: <br />
        (TransferFrom)
        (Allowance)
        (totalSupply)
      </div>
    );
  }
});

window.TokenPage = TokenPage;
