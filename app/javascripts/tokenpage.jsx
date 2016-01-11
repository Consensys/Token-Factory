var TokenPage = React.createClass({
  getInitialState: function() {
    return {
      contract_address: '',
      transferAmount: 0,
      web3_token: '',
      balance_result: '',
      transfer_result: '',
      transferFrom_result: '',
      approve_result: '',
      allowance_result: '',
    };
  },
  componentDidMount: function() {
    this.setState({contract_address: this.props.params.contract_address});
    var web3_token = web3_rab.eth.contract(Standard_Token.abi).at(this.props.params.contract_address); //for reflux-tx
    this.setState({web3_token: web3_token});
    var addr = AccountStore.getSelectedAddress();
    var totalSupply = web3_token.totalSupply.call({from: addr});
    console.log(totalSupply);
    this.setState({totalSupply: totalSupply.c[0]});
  },
  successOnBalance: function(result, args) {
    //call when balanceOf call succeeds.
    //args[0] = address
    console.log(result);
    var balance_result = <div>Balance of {args[0]} is {result.c[0]}. </div>
    this.setState({balance_result: balance_result});
  },
  successOnTransfer: function(args, receipt) {
    //call when transfer succeeds.
    //args[0] = to address
    //args[1] = amount
    var transfer_result = <div>{args[1]} has been transferred to {args[0]}. </div>
    this.setState({transfer_result: transfer_result});
  },
  successOnTransferFrom: function(args, receipt) {
    //call when transferFrom succeeds.
    //args[0] = from address
    //args[1] = to address
    //args[2] = amount
    var transferFrom_result = <div>{args[2]} has been transferred to {args[1]} from {args[0]}. </div>
    this.setState({transferFrom_result: transferFrom_result});
  },
  successOnApproval: function(args, receipt) {
    //call when approval succeeds.
    //args[0] = to address
    //args[1] = amount
    var approve_result = <div>{args[1]} has been approved to withdraw an amount of {args[1]}. </div>
    this.setState({approve_result: approve_result});
  },
  successOnAllowance: function(result, args) {
    //call when allowance call succeeds.
    //args[0] = address 1 (owner)
    //args[1] = address 2 (spender)
    var allowance_result = <div>{args[1]} is allowed to spend {result.c[0]} from {args[0]}</div>
    this.setState({allowance_result: allowance_result});
  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Interacting with token at address: {this.state.contract_address}. <br />
        Total Supply is: {this.state.totalSupply}.
        <br />
        <div className="form-group">
          <TXComponent filter={{txType: "transfer"}}>
            <TxForm web3_token = {this.state.web3_token}
                    txStyle = "transaction"
                    txType = "transfer"
                    abiFunction = "transfer"
                    header = "Transfer Token"
                    msg = "Transfer to another account."
                    buttonAction = "Transfer Amount"
                    buttonProcessing = "Transferring Amount"
                    successful = {this.successOnTransfer}
                    inputs = {[{placeholder: "to: eg 0xdeadbeef", key: "address", ref: "address"},
                              {placeholder: "amount: eg. 10", key: "amount", ref: "amount"}]}
              />
          </TXComponent> <br />
          {this.state.transfer_result}
        </div>

        <TXComponent filter={{txType: "approve"}}>
          <TxForm web3_token = {this.state.web3_token}
                  txStyle = "transaction"
                  txType = "approve"
                  abiFunction = "approve"
                  header = "Approve Account"
                  msg = "Approve account to withdraw multiple times up to the specified amount."
                  buttonAction = "Approve Amount"
                  buttonProcessing = "Approving Amount"
                  successful = {this.successOnApproval}
                  inputs = {[{placeholder: "to: eg 0xdeadbeef", key: "address", ref: "address"},
                            {placeholder: "amount: eg. 10", key: "amount", ref: "amount"}]}
            />
        </TXComponent> <br />
      {this.state.approve_result}

      <TXComponent filter={{txType: 'balanceOf'}}>
        <TxForm web3_token = {this.state.web3_token}
                txStyle = "call"
                txType = "balanceOf"
                abiFunction = "balanceOf"
                header = "Check Balance"
                msg = "Check balance of account."
                buttonAction = "Check Balance"
                buttonProcessing = "Checking Balance"
                successful = {this.successOnBalance}
                inputs = {[{placeholder: "to: eg 0xdeadbeef", key: "address", ref: "address"}]}
        />
      </TXComponent> <br />
    {this.state.balance_result} <br />

        <TXComponent filter={{txType: "transferFrom"}}>
          <TxForm web3_token = {this.state.web3_token}
                  txStyle = "transaction"
                  txType = "transferFrom"
                  abiFunction = "transferFrom"
                  header = "Transfer Allowance"
                  msg = "Transfer between accounts a specified amount that you've been authorised to do so."
                  buttonAction = "Transfer Allowance"
                  buttonProcessing = "Transferring Allowance"
                  successful = {this.successOnTransferFrom}
                  inputs = {[{placeholder: "from: eg 0xdeadbeef", key: "fromAddress", ref: "fromAddress" },
                            {placeholder: "to: eg 0xdeadbeef", key: "toAddress", ref: "toAddress" },
                            {placeholder: "amount: eg 10", key: "amount", ref: "amount" }]}
          />
        </TXComponent> <br />
      {this.state.transferFrom_result}

      <TXComponent filter={{txType: "allowance"}}>
        <TxForm web3_token = {this.state.web3_token}
                txStyle = "call"
                txType = "allowance"
                abiFunction = "allowance"
                header = "Check Allowance"
                msg = "Check what amount has been approved for withdrawal between two accounts."
                buttonAction = "Check Allowance"
                buttonProcessing = "Checking Allowance"
                successful = {this.successOnAllowance}
                inputs = {[{placeholder: "owner: eg 0xdeadbeef", key: "fromAddress", ref: "fromAddress"},
                          {placeholder: "spender: eg 0xdeadbeef", key: "toAddress", ref: "toAddress" }]}
        />
    </TXComponent> <br />
  {this.state.allowance_result}

      </div>
    );
  }
});

window.TokenPage = TokenPage;
