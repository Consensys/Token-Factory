import React from "react";
import {TXComponent} from "reflux-tx";
import TxForm from "./txform.jsx";

/*
Token wallet page. How you interact with a standard token.

When issuing a tx, the button will display that it is loading/waiting until finished.
Next to button/input field, the result will be displayed if finished.

Currently, since decimals, name & symbol are optionals, one needs to check if the specified code at the address have these, before proceeding.
*/

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
      token_symbol: '',
      valid: true
    };
  },
  componentDidMount: function() {
    this.setState({contract_address: this.props.params.contract_address});

    //it is going to want to try and use HumanStandardToken ABI, hoping that is this ERC20 version of the token.
    var web3_token = web3.eth.contract(HumanStandardToken.abi).at(this.props.params.contract_address); //for reflux-tx
    console.log(web3_token);
    window.token_c = web3_token; //for debugging
    this.setState({web3_token: web3_token});
    var that = this;

    var accounts = web3.eth.getAccounts(function(err, accounts) {
      var addr = accounts[0]; //first account in metamask is one that's active. Might have to swop/change for Mist in the future.
      web3_token.totalSupply.call({from: addr}, function(err, totalSupply) {
          console.log(totalSupply);
          that.setState({totalSupply: totalSupply.toString()});

          //a check that if the address returns 0 here, it's either invalid or not usable and user gets notified.
          if(totalSupply.toString() === "0") {
            that.setState({valid: false});
          }
      });

      that.setState({current_user_address: addr});

      //totalSupply is currently used to check if legitimate ERC20.
      //optionals currently are the vanity vars: decimals, symbol and name.
      //the token can still work, thus if not present they aren't currently shown or added to the UI.

      //decimals() signature: 0x313ce567
      //name() signature: 0x06fdde03
      //symbol() signature: 0x95d89b41
      var decimals_sig = "13ce567";
      var name_sig = "06fdde03";
      var symbol_sig = "95d89b41";


      web3.eth.getCode(that.props.params.contract_address, function(err, result) {
        //console.log(result);

        if(result.indexOf(decimals_sig) >= 0) {
          console.log("decimals present");
          web3_token.decimals.call({from: addr}, function(err, decimals) {
            //ABI will force it to expect BigNumber.
            //because it throws via fallback function if not present, it gets back 0.
            if(err) { console.log(err); }
            if(decimals) { console.log(decimals); that.setState({token_decimals: decimals}); }
          });
        }
        if(result.indexOf(name_sig) >= 0) {
          console.log("name present");
          web3_token.name.call({from: addr}, function(err, name) {
            if(err) { console.log(err); }
            if(name) { console.log(name); that.setState({token_name: name}); }
          });
        }
        if(result.indexOf(symbol_sig) >= 0) {
          console.log("symbol present");
          web3_token.symbol.call({from: addr}, function(err, symbol) {
            //ABI expects string here,
            if(err) { console.log(err); }
            if(symbol) { console.log(symbol); that.setState({token_symbol: symbol}); }
          });
        }
      });
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
    //if name & symbol exists, use them.
    var transfer_header = '';
    if(this.state.token_name != '') { transfer_header = "Transfer " + this.state.token_name; } else { transfer_header = "Transfer Token"; }

    var top_header = '';
    if(this.state.token_symbol != '') {
      top_header = <span><h2>{this.state.token_name} ({this.state.token_symbol})</h2> <br /></span>;
    }

    if(this.state.valid == false) {
      top_header = <span><h2>There doesn't seem to be a token contract at this address.</h2> <br /></span>;
    }

    /*
    TXComponent is from reflux-tx to monitor tx state. Wrapping components with it, means those components can monitor those tx states.
    */

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
