var FrontPage = React.createClass({
  render: function() {
    return (
      <div>
        Welcome to token Factory.<br />
        <br />
        You can interact with any token system (that followed the standard APIs) & create tokens.<br />
        <br />
        <Link to={'/tokensearch'}>Interact with a Token System</Link> <br />
        <Link to={'/factory'}>Create Tokens</Link> <br />
      </div>
    );
  }
});

window.FrontPage = FrontPage;
