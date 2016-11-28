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
  activateUPort: function() {
    console.log("trying to activate");
    localStorage["provider"] = "uport";
    //window.offline = true;
    location.reload(); //refresh
  },
  render: function() {
    /*
    <h3 style={{textAlign: "center"}}>OR</h3>
    <button style={{textAlign: "center"}} className="btn btn-default center-block" onClick={this.activateUPort}>Activate uPort</button></p>
    */
    if(window.offline) {
      var offline_msg = <p style={{textAlign: "center"}}>You are currently OFFLINE. <br /><br />
      In order to use the Token Factory, you need to: <br />
    <a style={{textAlign: "center"}} href="https://metamask.io"><img width="200px" className="logo img-responsive center-block" src="./images/mm.png"></img></a>
    </p>

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
        </p>
      </div>
    );
  }
});

module.exports = FrontPage;
