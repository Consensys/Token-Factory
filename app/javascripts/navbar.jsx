import React from "react";
import { Link } from "react-router";
//import AccountBadge from "react-account-badge";
//<AccountBadge web3={web3_rab} />
var NavBar = React.createClass({
  getInitialState: function() {
    return {
      blockNumber: 0,
    };
  },
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Factory</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/tokensearch'}>Interact With Token Contract</Link></li>
                <li><Link to={'/factory'}>Create Token Contract</Link></li>
              </ul>
                <p className="navbar-text">Block Number: {this.props.blockNumber}</p>



            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = NavBar;
