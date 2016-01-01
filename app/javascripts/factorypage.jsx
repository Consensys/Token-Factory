var FactoryPage = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    }
  },
  successOnCreation: function(args, receipt) {
    histor.pushState(null, '/token/' + receipt.contractAddress);
  },
  render: function() {
    return (
      <div>
        <TXComponent filter={{txType: "token_creation"}}>
          <TxForm txType = "token_creation"
                  header = "Create Token"
                  msg = "Create Token Contract with the following initial amount."
                  buttonAction = "Create Token"
                  buttonProcessing = "Creating Token"
                  successful = {this.successOnCreation}
                  inputs = {[{placeholder: "amount: eg. 10", key: "amount", ref: "amount"}]}
            />
        </TXComponent> <br />
      </div>
    );
  }
});

window.FactoryPage = FactoryPage;
