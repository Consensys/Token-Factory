window.Route = ReactRouter.Route;
window.Router = ReactRouter.Router;
window.IndexRoute = ReactRouter.IndexRoute;
window.Link = ReactRouter.Link;
window.TXActions = refluxTX.TXActions;
window.TXComponent = refluxTX.TXComponent;
TXActions.connect({provider: 'http://localhost:8545', confirmCount: 1, bufferSize: 5})

window.web3_rab = new Web3();
console.log(web3);
web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545')); //default provider until overwritten.

window.AccountBadge = accountBadge.AccountBadge;
window.AccountStore = accountBadge.AccountStore;

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
          <Route path="/token/:contract_address" component={TokenPage} />
        </Route>
      </Router>
    ), document.body);

  });
};
