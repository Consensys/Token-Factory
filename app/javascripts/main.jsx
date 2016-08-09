import {} from "../stylesheets/app.scss";

import React from "react";
import ReactDOM from "react-dom";
import ReactRouter from "react-router";
import { Router, Route, IndexRoute, Link } from 'react-router';
import { TXActions } from 'reflux-tx';
import {TXComponent} from "reflux-tx";

//hacky way to force checked web3 to be used everywhere vs accidentally using injected web3.
var web3 = require("./web3_bootstrap.js"); //thus injected web3 is now web3 in this scope.
window.web3 = web3; //overwrite injected web3 with replaced one.

import NavBar from "./navbar.jsx";
import FactoryPage from "./factorypage.jsx";
import FrontPage from "./frontpage.jsx";
import TokenPage from "./tokenpage.jsx";
import TokenSearchPage from "./tokensearchpage.jsx";
require('bootstrap-webpack!./bootstrap.config.js');
var $ = require('jquery');

//TXActions/Reflux-TX is a lib that keeps track of txes across page refreshes.
//bufferSize = how many txes to store at once.
TXActions.connect(web3, {confirmCount: 1, bufferSize: 5})

//remove _k thing from URLS (removing queryKey)
import createHistory from 'history/lib/createHashHistory';

let history = createHistory({
  queryKey: false
});

let App = React.createClass({
  getInitialState: function() {
    return {
      blockNumber: 0,
      offline_msg: ''
    };
  },
  componentDidMount: function() {
    //when mounting check if online/offline

    var that = this;
    if(window.offline == true) {
      console.log('offline');
      this.setState({offline_msg: "YOU ARE OFFLINE."});
      this.setState({blockNumber: 'OFFLINE'});
    }

  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <TXComponent>
              <NavBar offline_msg={this.state.offline_msg}/>
            </TXComponent>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

window.onload = function() {

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

};
