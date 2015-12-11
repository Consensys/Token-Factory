var FrontPage = React.createClass({
  render: function() {
    return (
      <div>
        <Link to={'/tokensearch'}>Interact with a Token System</Link>
      </div>
    );
  }
});

window.FrontPage = FrontPage;
