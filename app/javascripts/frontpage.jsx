var FrontPage = React.createClass({
  render: function() {
    return (
      <div>
        Welcome to this token issuance & management dapp. <br />
        <br />
        You can interact with any token system (that followed the standard APIs) & create tokens.<br />
        <br />
        <Link to={'/tokensearch'}>Interact with a Token System</Link> <br />
        <Link to={'/factory'}>Create Tokens</Link> <br />
        <br />
        (In the future display tokens this wallet has created & tallies of token amounts that it owns)
      </div>
    );
  }
});

window.FrontPage = FrontPage;
