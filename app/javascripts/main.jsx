//currently uses modified reflux-tx & modified ethersim to work.
//also moved to react 0.13 (history 1.13 & removed reactdom) for reflux-tx to work.
//NOTE: The code uses a combo of promises + reflux-tx store.
//For call it uses promise, but for normal transactions it uses the store.
window.Route = ReactRouter.Route;
window.Router = ReactRouter.Router;
window.IndexRoute = ReactRouter.IndexRoute;
window.Link = ReactRouter.Link;
window.TXActions = refluxTX.TXActions;
window.TXComponent = refluxTX.TXComponent;
TXActions.connect({provider: 'http://localhost:8545', confirmCount: 1, bufferSize: 5})

window.AccountBadge = accountBadge.AccountBadge;
window.AccountSelector = accountBadge.AccountSelector;

//remove _k thing from URLS (removing queryKey)
window.histor = History.createHashHistory({
  queryKey: false
});

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <NavBar />
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

window.onload = function() {
  // check if RPC is online. Why though?
  web3.eth.getCoinbase(function(error, coinbase) {
    window.MainRouter = Router;
    ReactDOM.render((
    //React.render((
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
