var CreateTokenForm = React.createClass({
  getInitialState: function() {
    return {
      value: 0,
      creating: false,
      creatingHash: 0,
      //createTx_hash: '',
    };
  },
  componentDidUpdate: function() {
    //first props are passed only after it mounted.
    if(this.state.creating == true) {
      for(var i = 0; i < this.props.confirmed.length; i+=1) {
        if(this.props.confirmed[i].receipt.transactionHash == this.state.creatingHash) {
          console.log(this.props.confirmed[i].receipt);
          this.setState({creating: false});
          //
          histor.pushState(null,'/token/'+this.props.confirmed[i].receipt.contractAddress);
        }
      }
    } else {
      if(this.props.pending.length > 0) {
        this.setState({creating: true});
        this.setState({creatingHash: this.props.pending[0].receipt.transactionHash});
      } else if (this.props.received.length > 0) {
        this.setState({creating: true});
        this.setState({creatingHash: this.props.received[0].receipt.transactionHash});
      }
    }
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  executeFunction: function() {
    //check if number. (or force that in the react form).
    //do loader gif/reflux store?
    //replace address with light-wallet/uPort.

    //for now, deployed separately, until factory is online.
    //thus users must remember their addresses (for now).
    var ST = web3.eth.contract(Standard_Token.abi);
    var tx_hash = ST.new(this.state.value, {from: web3.eth.accounts[0], data: Standard_Token.binary});

    TXActions.add({hash: tx_hash.transactionHash, txType: "token_creation"});
    this.setState({creating: true});
    this.setState({creatingHash: tx_hash.transactionHash});
  },
  render: function() {
    //return error if not actual token system.
    if(this.state.creating == true) {
      var creatingToken = <div>Creating Token...</div>;
    }
    return (
      <div>
        Enter the amount, the creator will receive: <br />
        <br />
        <input type="text" value={this.state.value} placeholder="eg 10000" onChange={this.handleChange}/>
        <button disabled={this.state.creating} onClick={this.executeFunction}>Create Token</button>
        {creatingToken}
      </div>
    );
  }
});

window.CreateTokenForm = CreateTokenForm;
