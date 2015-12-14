var FactoryPage = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    }
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div>
        Enter the amount, the creator will receive: <br />
        <br />
        <input type="text" value={this.state.value} placeholder="eg 10000" onChange={this.handleChange}/>
        <button onClick={this.executeFunction}>Create Token</button>
        ---
        (show what tokens current selected address has created).
      </div>
    );
  },
  executeFunction: function() {
    //check if number. (or force that in the react form).
    //do loader gif/reflux store?
    //replace address with light-wallet/uPort.

    //for now, deployed separately, until factory is online.
    //thus users must remember their addresses (for now).
    var st_ctr = null;
    var comp = this;
    Standard_Token.new(this.state.value, {from: web3.eth.accounts[0]}).then(function(ctr) {
        st_ctr = ctr;
        return ctr.balanceOf.call(web3.eth.accounts[0]);
    }).then(function (result) {
        comp.props.history.pushState(null,'/token/'+st_ctr.address);
    });
  }
});

window.FactoryPage = FactoryPage;
