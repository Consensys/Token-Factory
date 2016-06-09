import {} from "../stylesheets/app.scss";

import React from "react";
import ReactDOM from "react-dom";
import ReactRouter from "react-router";
import { Router, Route, IndexRoute, Link } from 'react-router';
import { TXActions } from 'reflux-tx';
//import TXActions from "reflux-tx".TXActions;
//import TXComponent from "reflux-tx".TXComponent;
//import AccountBadge from "react-account-badge";
var web3 = require("./web3_bootstrap.js");
//import Web3 from "web3";

//web3? Apparently it is "provided"?

import NavBar from "./navbar.jsx";
import FactoryPage from "./factorypage.jsx";
import FrontPage from "./frontpage.jsx";
import TokenPage from "./tokenpage.jsx";
import TokenSearchPage from "./tokensearchpage.jsx";
require('bootstrap-webpack!./bootstrap.config.js');
var $ = require('jquery');
//console.log($);


//feels like webpack anti-pattern??
//window.Route = ReactRouter.Route;
//window.Router = ReactRouter.Router;
//window.IndexRoute = ReactRouter.IndexRoute;
//window.Link = ReactRouter.Link;

//window.TXActions = refluxTX.TXActions;
//window.TXComponent = refluxTX.TXComponent;
console.log(TXActions);
TXActions.connect(web3, {confirmCount: 1, bufferSize: 5})

//window.web3_rab = new Web3();
//console.log(web3);
//web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545')); //default provider until overwritten.

//window.AccountBadge = accountBadge.AccountBadge;
//window.AccountStore = accountBadge.AccountStore;

//remove _k thing from URLS (removing queryKey)
import createHistory from 'history/lib/createHashHistory';
//window.histor = History.createHashHistory({
let history = createHistory({
  queryKey: false
});



let App = React.createClass({
  getInitialState: function() {
    return {
      blockNumber: web3.eth.blockNumber,
      offline_msg: ''
    };
  },
  componentDidMount: function() {
    var that = this;
    if(window.offline == true) {
      console.log('offline');
      this.setState({offline_msg: "YOU ARE OFFLINE."});
      this.setState({blockNumber: 'OFFLINE'});
    }
    //filter here seems like "non"-react way to do things.
    //TXComponent inherits blocknumber. Use that instead.
    web3.eth.filter('latest', function(error, result){
      if (!error)
        console.log('app watcher');
        setTimeout(that.checkBlockNumber, 1000); //wait a bit
    });

    //TODO: log current address in here instead with a timeout
  },
  checkBlockNumber: function() {
      //console.log(web3);
      var nbn = web3.eth.blockNumber;
      if(nbn > this.state.blockNumber) {
        console.log(nbn);
        this.setState({blockNumber: nbn});
      }
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <NavBar blockNumber={this.state.blockNumber} offline_msg={this.state.offline_msg}/>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

window.onload = function() {
  // check if RPC is online. Why though?
  //web3.eth.getCoinbase(function(error, coinbase) {
    //window.MainRouter = Router;
    HumanStandardToken.load(Pudding);

    ReactDOM.render((
    //React.render((
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={FrontPage} />
          <Route path="/tokensearch" component={TokenSearchPage} />
          <Route path="/factory" component={FactoryPage} />
          <Route path="/token/:contract_address" component={TokenPage} />
        </Route>
      </Router>
    ), document.getElementById('main'));

  //});
};
