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
        <TXComponent filter={{txType: "transfer"}}>
          <TransferForm contractAddress = {this.props.params.address} />
        </TXComponent> <br />

        <TXComponent filter={{txType: "approve"}}>
          <ApproveForm contractAddress = {this.props.params.address}/>
        </TXComponent> <br />

        <TXComponent filter={{txType: "unapprove"}}>
          <UnapproveForm />
        </TXComponent> <br />
        <BalanceOfForm contractAddress = {this.props.params.address}/> <br />

        Other Functions: <br />
        (TransferFrom)
        (Allowance)
        (totalSupply)
      </div>
    );
  }
});

window.TokenPage = TokenPage;
