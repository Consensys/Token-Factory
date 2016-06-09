import React from "react";
import {TXComponent} from "reflux-tx";
import TxForm from "./txform.jsx";

var TokenPage = React.createClass({
  getInitialState: function() {
    return {
      current_user_address: '',
      contract_address: '',
      transferAmount: 0,
      web3_token: '',
      balance_result: '',
      transfer_result: '',
      transferFrom_result: '',
      approve_result: '',
      allowance_result: '',
      token_decimals: '',
      token_name: '',
      token_symbol: ''
    };
  },
  componentDidMount: function() {
    this.setState({contract_address: this.props.params.contract_address});
    //var web3_token = web3_rab.eth.contract(HumanStandardToken.abi).at(this.props.params.contract_address); //for reflux-tx
    var web3_token = web3.eth.contract(HumanStandardToken.abi).at(this.props.params.contract_address); //for reflux-tx
    window.token_c = web3_token;
    this.setState({web3_token: web3_token});
    var that = this;
    web3.eth.getAccounts(function(err, accounts){
      var addr = accounts[0];
      console.log(addr);
      var totalSupply = web3_token.totalSupply.call({from: addr});
      console.log(totalSupply);

      that.setState({totalSupply: totalSupply.c[0]});
      that.setState({current_user_address: addr});
      var decimals = web3_token.decimals.call({from: addr});
      var symbol = web3_token.symbol.call({from: addr});
      var name = web3_token.name.call({from: addr});
      if(decimals) { that.setState({token_decimals: decimals}); }
      if(symbol) { that.setState({token_symbol: symbol}); }
      if(name) { that.setState({token_name: name}); }
      console.log(decimals + symbol + name);
    });
  },
  successOnBalance: function(result, args) {
    //call when balanceOf call succeeds.
    //args[0] = address
    //don't need to check args since it is a sync call
    console.log(result);
    var balance_result = <div>Balance of {args[0]} is {result.c[0]}. </div>
    this.setState({balance_result: balance_result});
  },
  successOnTransfer: function(args, receipt) {
    //call when transfer succeeds.
    //args[0] = to address
    //args[1] = amount
    if(args.length > 0) {
      var transfer_result = <div>{args[1]} has been transferred to {args[0]}. </div>
    } else { var transfer_result = <div>Tokens were successfully transferred.</div> }
    this.setState({transfer_result: transfer_result});
  },
  successOnTransferFrom: function(args, receipt) {
    //call when transferFrom succeeds.
    //args[0] = from address
    //args[1] = to address
    //args[2] = amount
    if(args.length > 0) {
      var transferFrom_result = <div>{args[2]} has been transferred to {args[1]} from {args[0]}. </div>
    } else { var transferFrom_result = <div>Tokens were succesfully transferred.</div> }
    this.setState({transferFrom_result: transferFrom_result});
  },
  successOnApproval: function(args, receipt) {
    //call when approval succeeds.
    //args[0] = to address
    //args[1] = amount
    if(args.length > 0) {
      var approve_result = <div>{args[1]} has been approved to withdraw an amount of {args[1]}. </div>
    } else { var approve_result = <div> Tokens have been approved </div> }
    this.setState({approve_result: approve_result});
  },
  successOnAllowance: function(result, args) {
    //call when allowance call succeeds.
    //args[0] = address 1 (owner)
    //args[1] = address 2 (spender)
    //no need to check args as this is a sync call
    var allowance_result = <div>{args[1]} is allowed to spend {result.c[0]} from {args[0]}</div>
    this.setState({allowance_result: allowance_result});
  },
  render: function() {
    //return error if not actual token system.
    var transfer_header = '';
    if(this.state.token_name != '') { transfer_header = "Transfer " + this.state.token_name; } else { transfer_header = "Transfer Token"; }

    var top_header = '';
    if(this.state.token_symbol != '') {
      top_header = <span><h2>{this.state.token_name} ({this.state.token_symbol})</h2> <br /></span>;
    }

    //Current User Address & Balance: {this.state.current_user_address}. <br />
    return (
      <div>
        {top_header}
        Interacting with token at address: {this.state.contract_address}. <br />
        Total Supply is: {this.state.totalSupply}. <br />
        <br />
        <div className="form-group">
          <TXComponent filter={{txType: "transfer"}}>
            <TxForm web3_token = {this.state.web3_token}
                    txStyle = "transaction"
                    txType = "transfer"
                    abiFunction = "transfer"
                    header = {transfer_header}
                    msg = "Transfer to another account."
                    buttonAction = "Transfer Amount"
                    buttonProcessing = "Transferring Amount"
                    successful = {this.successOnTransfer}
                    inputs = {[{placeholder: "to: eg 0x1ceb00da", key: "address", ref: "address"},
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
                  inputs = {[{placeholder: "to: eg 0x1ceb00da", key: "address", ref: "address"},
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
                inputs = {[{placeholder: "to: eg 0x1ceb00da", key: "address", ref: "address"}]}
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
                  inputs = {[{placeholder: "from: eg 0x1ceb00da", key: "fromAddress", ref: "fromAddress" },
                            {placeholder: "to: eg 0x1ceb00da", key: "toAddress", ref: "toAddress" },
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
                inputs = {[{placeholder: "owner: eg 0x1ceb00da", key: "fromAddress", ref: "fromAddress"},
                          {placeholder: "spender: eg 0x1ceb00da", key: "toAddress", ref: "toAddress" }]}
        />
    </TXComponent> <br />
  {this.state.allowance_result}

      </div>
    );
  }
});

module.exports = TokenPage;
