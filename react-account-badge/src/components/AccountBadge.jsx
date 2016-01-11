var React              = require('react');
var HookedWeb3Provider = require('hooked-web3-provider');
var Transaction        = require('ethereumjs-tx');
var AccountSelector    = require('./AccountSelector.jsx');
var AddressSpot        = require('./AddressSpot.jsx');
var WalletPassword     = require('./WalletPassword.jsx');
var Badge              = require('./Badge.jsx');
var AccountStore       = require('../flux/AccountStore.js');
var Actions            = require('../flux/Actions.js');
var config             = require('../config.js');
var PersonaStore       = require('../flux/PersonaStore.js');

var addresses = [];

// gasPrice will be used when sending a transaction through HookedWeb3Provider when
// it has not been specified by original caller.
var gasPrice;

var AccountBadge = React.createClass({

    getInitialState: function() {
        return {
            accountSelector: false,
            selectedAddress: '',
            passwordScreen: false,
            passwordCallback: null,
        }
    },

    openAddressSelector: function() {
        this.setState({accountSelector:true});
    },

    closeAddressSelector: function() {
        this.setState({accountSelector:false});
    },

    closePasswordScreen: function() {
        this.setState({passwordScreen:false});
    },

    onEnteredPassword: function(password, callback) {
        try {
            this.state.passwordCallback(password);
            this.setState({passwordScreen:false});
        } catch (err) {
            callback(err);
        }
    },

    onSelect: function(address) {
        this.setState({
            selectedAddress: address,
            accountSelector: false
        });
        if (this.props.onChangeAddress) {
            this.props.onChangeAddress(address);
        }
        Actions.setSelectedAddress(address);
    },

    askWalletPassword: function(callback) {
        this.setState({passwordScreen: true, passwordCallback: callback});
    },

    componentWillMount: function() {
        var _this = this;
        this.enableHookedWeb3Provider();
        this.props.web3.eth.getAccounts(function(err, accounts) {
            if (err) console.error(err);
            addresses = accounts;
            if (AccountStore.getSelectedAddress() == '') {
                _this.setState({selectedAddress: accounts[0]});
                Actions.setSelectedAddress(accounts[0]);
            } else {
                _this.setState({selectedAddress: AccountStore.getSelectedAddress()});
            }
        });
        this.props.web3.eth.getGasPrice(function(err, price) {
            if (err) console.error(err);
            gasPrice = '0x' + price.toString(16);
        });
    },

    enableHookedWeb3Provider: function() {

        var hasAddress = function(address, callback) {
            var found = false;
            var addrToCheck = address;
            if (!addrToCheck.startsWith('0x')) {
                addrToCheck = '0x' + addrToCheck;
            }
            for (var i = 0; i < addresses.length; i++) {
                if (addrToCheck == addresses[i]) {
                    found = true;
                    break;
                }
            }
            console.log('found: ' + found);
            callback(null, !found);
        };

        var _this = this;
        var signTransaction = function(tx_params, callback) {
            //console.log('signTransaction: ' + JSON.stringify(tx_params));
            if (!tx_params.gasPrice) {
                tx_params.gasPrice = gasPrice;
            }
            tx_params.gasLimit = tx_params.gas;
            var from = tx_params.from;
            if (!from.startsWith('0x')) {
                from = '0x' + from;
                tx_params.from = from;
            }
            var tx = new Transaction(tx_params);
            var rawTx = tx.serialize().toString('hex');
            _this.askWalletPassword(function(password) {
                if (!password) return;
                //console.log('password = [' + password + ']');
                //try {
                    var signed = AccountStore.getKeystore().signTx(rawTx, password, tx_params.from.substring(2));
                    //console.log('signed: ' + signed);
                    callback(null, signed);
                //} catch (err) {
                //    console.error(err);
                //    callback(err, null);
                //}
            });
        };

        var provider = new HookedWeb3Provider({
            host: 'http://' + config.web3Provider,
            transaction_signer: {
                hasAddress: hasAddress,
                signTransaction: signTransaction
            }
        });

        this.props.web3.setProvider(provider);
    },

    render: function() {
        return (
            <div>
                <Badge
                    eid='top-as'
                    web3={this.props.web3}
                    address={this.state.selectedAddress}
                    onClick={this.openAddressSelector}
                />
                <AccountSelector
                    web3={this.props.web3}
                    onClose={this.closeAddressSelector}
                    onSelect={this.onSelect}
                    visible={this.state.accountSelector}
                />
                <WalletPassword
                    onProceed={this.onEnteredPassword}
                    onCancel={this.closePasswordScreen}
                    visible={this.state.passwordScreen}
                />
            </div>
        );
    }

});

module.exports = AccountBadge;
