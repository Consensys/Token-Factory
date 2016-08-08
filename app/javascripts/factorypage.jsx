import React from "react";
import {TXComponent} from "reflux-tx";
import TxForm from "./txform.jsx";

/*
Page to create/issue a token.
Upon success/mined, forward to token wallet page.
*/

var FactoryPage = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    }
  },
  successOnCreation: function(args, receipt) {
    this.props.history.pushState(null, '/token/' + receipt.contractAddress);
  },
  render: function() {
    return (
      <div>
        <TXComponent filter={{txType: "token_creation"}}>
          <TxForm txType = "token_creation"
                  header = "Create Token"
                  msg = "Create Token Contract with the following parameters."
                  buttonAction = "Create Token"
                  buttonProcessing = "Creating Token"
                  successful = {this.successOnCreation}
                  inputs = {[{placeholder: "totaly supply: eg. 10", key: "amount", ref: "amount"},
                             {placeholder: "name: eg Simon Bucks", key: "name", ref: "name"},
                             {placeholder: "decimal places: eg 4", key: "decimals", ref: "decimals"},
                             {placeholder: "symbol: eg SBX", key: "symbol", ref: "symbol"},

                  ]}
            />
        </TXComponent> <br />
      </div>
    );
  }
});

module.exports = FactoryPage;
