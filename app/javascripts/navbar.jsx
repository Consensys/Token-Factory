var NavBar = React.createClass({
  render: function() {
    return (
      <div>
        <Link to={'/'}>Home</Link> -
        <Link to={'/tokensearch'}>Token Interface</Link> -
        <Link to={'/factory'}>Create Token</Link> -

      </div>
    );
  }
});

window.NavBar = NavBar;
