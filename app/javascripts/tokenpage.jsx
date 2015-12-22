var TokenPage = React.createClass({
  getInitialState: function() {
    //abi is at Standard_Token.abi.
    return {
      address: '',
      transferAmount: 0,
      web3_token: '',
      pudding_token: '',
    };
  },
  componentDidMount: function() {
    this.setState({address: this.props.params.address});
    var web3_token = web3.eth.contract(Standard_Token.abi).at(this.props.params.address); //for reflux-tx
    var pudding_token = Standard_Token.at(this.props.params.address); //for promises
    this.setState({web3_token: web3_token});
    this.setState({pudding_token: pudding_token});
    var that = this;
    pudding_token.totalSupply.call({from: web3.eth.accounts[0]}).then(function (result) {
      //console.log(result);
      that.setState({totalSupply: result.c[0]});
    });
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Interacting with token at address: {this.state.address}. <br />
        Total Supply is: {this.state.totalSupply}.
        <br />
        Basic Functions: <br />
        <br />
        <TXComponent filter={{txType: "transfer"}}>
          <TransferForm pudding_token = {this.state.pudding_token} web3_token = {this.state.web3_token} />
        </TXComponent> <br />

        <TXComponent filter={{txType: "approve"}}>
          <ApproveForm pudding_token = {this.state.pudding_token} web3_token = {this.state.web3_token} />
        </TXComponent> <br />

        <UnapproveForm />
        <BalanceOfForm pudding_token = {this.state.pudding_token} web3_token = {this.state.web3_token} /> <br />

        Other Functions: <br />
        <TXComponent filter={{txType: "transferFrom"}}>
          <TransferFromForm pudding_token = {this.state.pudding_token} web3_token = {this.state.web3_token} />
        </TXComponent> <br />
      <AllowanceForm pudding_token = {this.state.pudding_token} web3_token = {this.state.web3_token} />

      </div>
    );
  }
});

window.TokenPage = TokenPage;
