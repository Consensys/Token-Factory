// This makes ReactRouter more consumable
// Copying code from dapp-store & inflekt. Will figure out nuances later.
window.Route = ReactRouter.Route;
window.Router = ReactRouter.Router;
window.histor = History.createBrowserHistory;

//es6 style
//window.render = ReactDOM.render;

window.onload = function() {
  // check if RPC is online. Why though?
  web3.eth.getCoinbase(function(error, coinbase) {

    ReactDOM.render((
      <Router history={histor}>
        <Route path="/" component={FrontPage}>
        </Route>
      </Router>
    ), document.body);

  });
};
