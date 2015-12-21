var TokenPage = React.createClass({
  getInitialState: function() {
    //abi is at Standard_Token.abi.
    return {
      address: '',
      transferAmount: 0,
      web3_contract: '',
      pudding_contract: '',
    };
  },
  componentDidMount: function() {
    this.setState({address: this.props.params.address});
    var web3_contract = web3.eth.contract(Standard_Token.abi).at(this.props.params.address); //for reflux-tx
    var pudding_contract = Standard_Token.at(this.props.params.address); //for promises
    this.setState({web3_contract: web3_contract});
    this.setState({pudding_contract: pudding_contract});
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
          <TransferForm pudding_token = {this.state.pudding_contract} web3_token = {this.state.web3_contract} />
        </TXComponent> <br />

        <TXComponent filter={{txType: "approve"}}>
          <ApproveForm pudding_token = {this.state.pudding_contract} web3_token = {this.state.web3_contract} />
        </TXComponent> <br />

        <UnapproveForm />
        <BalanceOfForm pudding_token = {this.state.pudding_contract} web3_token = {this.state.web3_contract} /> <br />

        Other Functions: <br />
        (TransferFrom)
        (Allowance)
      </div>
    );
  }
});

window.TokenPage = TokenPage;
