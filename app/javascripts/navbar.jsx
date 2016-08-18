import React from "react";
import { Link } from "react-router";

/*
Basic navbar.
Shows dynamic block number for good UX
*/

//TODO: Re-add account badge if on mobile.

var NavBar = React.createClass({
  getInitialState: function() {
    return {
      current_blocknr: 0,
      current_timestamp: 0,
      time_diff: 0
    };
  },
  componentDidMount: function() {
    var that = this;
    window.setInterval(function(){
      var ts = that.state.current_timestamp;
      var now = Math.floor(Date.now()/1000);
      web3.eth.getBlock("latest", function(err, result) {
        if(result.number > that.state.current_blocknr) {
          that.setState({current_blocknr: result.number});
          that.setState({current_timestamp: now});
          ts = now;
        }
      });

      if(ts > 0) {
        that.setState({time_diff: now - ts});
      }
    }, 1000);
  },
  componentDidUpdate: function() {
    //problem of relying on reflux-tx is that reflux-tx only updates blocks when it is actively having a tx in it.
    //so have to resort to manual checking.
  },
  deactivateUPort: function() {
    console.log("trying to deactivate");
    localStorage["provider"] = "";
    location.reload(true);
  },
  render: function() {
    var uport_deactivate = "";

    if(localStorage["provider"] == "uport") {
      //uport_deactivate = <a href="#" onClick={this.deactivateUPort}>Deactivate uPort</a>
      uport_deactivate = <li><Link to={"/"} onClick={this.deactivateUPort}>Deactivate uPort</Link></li>
    }
    return (
      <div>
        <nav style={{}} className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#"><img height="25px" src="./images/icon.png"></img></a>
              <p className="navbar-text" style={{textDecoration: 'underline'}}>Block Number: {this.state.current_blocknr}. {this.state.time_diff}s. </p>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/tokensearch'}>Interact With Token Contract</Link></li>
                <li><Link to={'/factory'}>Create Token Contract</Link></li>
                {uport_deactivate}
                <li><p className="navbar-text" style={{color: 'red'}}>{this.props.offline_msg}</p></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = NavBar;
