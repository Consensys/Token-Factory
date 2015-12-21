var BalanceOfForm = React.createClass({
  getInitialState: function() {
    return {
      balanceAddress: '',
      st_ctr: '',
      displayedBalance: '',
    };
  },
  componentDidMount: function() {
    console.log('mounted balance');
    var st_ctrr = Standard_Token.at(this.props.contractAddress);
    this.setState({st_ctr: st_ctrr});
  },
  handleAddressChange: function(event) {
    this.setState({balanceAddress: event.target.value});
  },
  executeFunction: function() {
    console.log(this.state.balanceAddress);

    //can use the normal Pudding promises, since it just a call, not a full transaction.
    var that = this;
    this.state.st_ctr.balanceOf.call(web3.eth.accounts[0], {from: web3.eth.accounts[0]}).then(function(result) {
      console.log(result.c[0]);
      var balToDisplay = <div>Balance of Address {that.state.balanceAddress} is: {result.c[0]}.</div>;
      that.setState({displayedBalance: balToDisplay});
    });

  },
  render: function() {
    //return error if not actual token system.
    return (
      <div>
        Total Supply is: 
      </div>
    );
  }
});

window.BalanceOfForm = BalanceOfForm;
