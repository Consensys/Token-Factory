import React from 'react';
import { Link } from 'react-router';

/*
Home/front page.
Warns if offline and recommends to install Metamask to use it.
*/

var FrontPage = React.createClass({
  getInitialState: function() {
    return {
      offline_msg: ''
    };
  },
  componentDidMount: function() {
  },
  render: function() {
    if(window.offline) {
      var offline_msg = <span>You are currently OFFLINE. In order to use the Token Factory, you need to have <a href='https://metamask.io'>Metamask</a> installed.</span>
    }
    return (
      <div>
        <h2 style={{textAlign: 'center'}}> Token Factory (Alpha) </h2>
        <img width="200px" className="logo img-responsive center-block" src="./images/icon.png"></img>
        <br />
        <p style={{textAlign: "center"}}>
        Issue & Interact with Standard Token Contracts on Ethereum. <br />
      <br />
        {offline_msg} <br />
        <br />
        <Link to={'/tokensearch'}>Interact with an already deployed Token Contract</Link> <br />
        <Link to={'/factory'}>Create Tokens</Link> <br />
        </p>
      </div>
    );
  }
});

module.exports = FrontPage;
