// This makes ReactRouter more consumable
// Copying code from dapp-store & inflekt. Will figure out nuances later.
window.Route = ReactRouter.Route;
window.Router = ReactRouter.Router;
window.IndexRoute = ReactRouter.IndexRoute;
window.Link = ReactRouter.Link;

//remove _k thing from URLS (removing queryKey)
window.histor = History.createHashHistory({
  queryKey: false
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
});

window.onload = function() {
  // check if RPC is online. Why though?
  web3.eth.getCoinbase(function(error, coinbase) {
    window.MainRouter = Router;
    ReactDOM.render((
      <Router history={histor}>
        <Route path="/" component={App}>
          <IndexRoute component={FrontPage} />
          <Route path="/tokensearch" component={TokenSearchPage} />
          <Route path="/factory" component={FactoryPage} />
          <Route path="/token/:address" component={TokenPage} />
        </Route>
      </Router>
    ), document.body);

  });
};
