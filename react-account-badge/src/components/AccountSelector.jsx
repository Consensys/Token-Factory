var React              = require('react');
var AddressSpot        = require('./AddressSpot.jsx');
var PasswordScreen     = require('./PasswordScreen.jsx');
var EntropyCollector   = require('./EntropyCollector.jsx');
var ConfirmationScreen = require('./ConfirmationScreen.jsx');
var SeedScreen         = require('./SeedScreen.jsx');
var EnterSeedScreen    = require('./EnterSeedScreen.jsx');
var TransferScreen     = require('./TransferScreen.jsx');
var Modal              = require('./Modal.jsx');
var AccountStore       = require('../flux/AccountStore.js');
var Actions            = require('../flux/Actions.js');

var AccountSelector = React.createClass({

    propTypes: {
        web3: React.PropTypes.object.isRequired,
    },

    getInitialState: function() {
        return {
            lwAddresses: [],
            nodeAddresses: [],
            selectedAddress: 'none',
            enterSeedScreen: false,
            entropyCollector: false,
            passwordScreen: false,
            seedScreen: false,
            transferScreen: false,
            transferTo: '',
            transferFrom: '',
            seed: '',
        };
    },

    _onChange: function() {
        var lwAddrs   = AccountStore.getLwAddresses();
        var nodeAddrs = AccountStore.getNodeAddresses();
        this.setState({
            lwAddresses:   lwAddrs,
            nodeAddresses: nodeAddrs,
            passwordScreen: false,
            enterSeedScreen: false,
            selectedAddress: AccountStore.getSelectedAddress()
        });
        var cselect = document.getElementById('rab-select');
        if (cselect.value == '6') {
            this.setState({
                seedScreen: true,
                seed: AccountStore.getTempSeed()
            });
        }
        cselect.selectedIndex = 0;
    },

    componentWillMount: function() {
        AccountStore.addChangeListener(this._onChange);
        if (!AccountStore.isInitialized()) {
            this.props.web3.eth.getAccounts(function(err, accounts) {
                if (err) {
                    console.error(err);
                    return;
                }
                Actions.addNodeAddresses(accounts);
            });
        } else {
            this._onChange();
        }
    },

    componentWillUnmount: function() {
        AccountStore.removeChangeListener(this._onChange);
    },

    onActions: function(e) {
        if (e.target.value == '0') {
            this.setState({entropyCollector: true});
            e.target.selectedIndex = 0;
        } else
        if (e.target.value == '3') {
            this.setState({passwordScreen: true});
        } else
        if (e.target.value == '4') {
            this.saveWalletToDisk();
            e.target.selectedIndex = 0;
        } else 
        if (e.target.value == '1') {
            this.startLoadFromDisk();
            e.target.selectedIndex = 0;
        } else
        if (e.target.value == '5') {
            this.setState({confirmationScreen: true});
            e.target.selectedIndex = 0;
        } else 
        if (e.target.value == '6') {
            this.setState({passwordScreen: true});
        } else 
        if (e.target.value == '2') {
            this.setState({enterSeedScreen: true});
        }
    },

    startLoadFromDisk: function() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            alert('The File APIs are not fully supported in this browser.');
        } else {
            document.getElementById('rab-walletFromDisk').click();
        }
    },

    loadWalletFromDisk: function(evt) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function() {
            var serialized = reader.result;
            Actions.deserializeLightWallet(serialized);
        };

        reader.readAsText(evt.target.files[0]);
        document.getElementById('rab-walletFromDisk').value = '';
    },

    saveWalletToDisk: function() {
        var serialized = AccountStore.getSerializedLightWallet();
        var blob = new Blob([serialized], {type: 'text/plain;charset=utf-8'});
        // for non-IE
        if (!window.ActiveXObject) {
            var save = document.createElement('a');
            save.href = window.URL.createObjectURL(blob);
            save.target = '_blank';
            save.download = 'lightwallet.dat';

            var event = document.createEvent('Event');
            event.initEvent('click', true, true);
            save.dispatchEvent(event);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }

        // for IE
        else if ( !! window.ActiveXObject && document.execCommand)     {
            var _window = window.open(fileURL, '_blank');
            _window.document.close();
            _window.document.execCommand('SaveAs', true, fileName || fileURL)
            _window.close();
        }
    },

    onSelect: function(address) {
        Actions.setSelectedAddress(address);
        this.setState({selectedAddress: address});
    },

    closeEntropyCollector: function() {
        this.setState({entropyCollector:false});
    },

    closePasswordScreen: function() {
        this.setState({passwordScreen: false});
        document.getElementById('rab-select').selectedIndex = 0;
    },

    closeConfirmationScreen: function() {
        this.setState({confirmationScreen: false});
        document.getElementById('rab-select').selectedIndex = 0;
    },

    closeSeedScreen: function() {
        this.setState({seedScreen: false, seed: ''});
        document.getElementById('rab-select').selectedIndex = 0;
    },

    closeEnterSeedScreen: function() {
        this.setState({enterSeedScreen: false});
        document.getElementById('rab-select').selectedIndex = 0;
    },

    closeTransferScreen: function() {
        this.setState({transferScreen: false});
    },

    confirmEraseLw: function() {
        Actions.removeLwFromLocalStorage();
        this.setState({confirmationScreen: false});
        document.getElementById('rab-select').selectedIndex = 0;
    },

    onProceed: function(pwd, seed) {
        var cvalue = document.getElementById('rab-select').value;
        if (cvalue == '3') {
            setTimeout(function() {
                Actions.newLwAddress(pwd);
            }, 50);
        } else
        if (cvalue == '6') {
            setTimeout(function() {
                Actions.retrieveSeed(pwd);
            }, 50);
        } else 
        if (cvalue == '2') {
            setTimeout(function() {
                Actions.loadLightWalletFromSeed(pwd, seed);
            }, 50);
        }
    },

    onOk: function() {
        this.props.onSelect(this.state.selectedAddress);
    },

    onDrop: function(toAddress) {
        console.log('AccountSelector: onDrop: ' + toAddress);
        this.setState({transferScreen: true, transferTo: toAddress});
    },

    onDragStart: function(address) {
        this.setState({transferFrom: address});
    },

    render: function() {

        var _this = this;

        var nodeAddresses = [];
        for (var i = 0; i < this.state.nodeAddresses.length; i++) {
            nodeAddresses.push(
                <AddressSpot 
                    eid={'rab-as-' + i}
                    key={'rab-as2-key-' + i}
                    web3={this.props.web3}
                    address={this.state.nodeAddresses[i]}
                    onSelect={this.onSelect}
                    onDropFunc={this.onDrop}
                    onDragStart={this.onDragStart}
                />);
        }
        var lwAddresses = [];
        for (var i = 0; i < this.state.lwAddresses.length; i++) {
            lwAddresses.push(
                <AddressSpot 
                    eid={'rab-as-lw-' + i}
                    key={'rab-as2-lw-' + i}
                    web3={this.props.web3}
                    address={this.state.lwAddresses[i]}
                    onSelect={this.onSelect}
                    onDropFunc={this.onDrop}
                    onDragStart={this.onDragStart}
                />);
        }

        var selectOptions = [];
        selectOptions.push(<option key='rab-ec-sel'>Actions</option>);
        selectOptions.push(<option key='rab-ec-sel0' value='0'>Create new light wallet</option>);
        selectOptions.push(<option key='rab-ec-sel1' value='1'>Load wallet from disk  </option>);
        selectOptions.push(<option key='rab-ec-sel2' value='2'>Load wallet from seed  </option>);
        if (this.state.lwAddresses.length > 0) {
            selectOptions.push(<option key='rab-ec-sel3' value='3'>Add new address    </option>);
            selectOptions.push(<option key='rab-ec-sel4' value='4'>Save wallet to disk</option>);
            selectOptions.push(<option key='rab-ec-sel5' value='5'>Erase wallet from local storage</option>);
            selectOptions.push(<option key='rab-ec-sel6' value='6'>Show wallet seed   </option>);
        }

        // TODO: change that!
        // This is to force re-creation with different properties.
        var now = new Date().getTime();

        return (<div>
            <Modal
                className='accountSelector'
                title='Account Manager'
                onCancel={this.props.onClose}
                visible={this.props.visible}>

                <div className='addressesLeft'>
                    <div className='title'>Node Addresses</div>
                    {nodeAddresses}
                </div>

                <div className='addressesRight'>
                    <div className='title'>Light Wallet Addresses</div>
                    {lwAddresses}
                    <select id='rab-select' onChange={this.onActions} className='select'>
                        {selectOptions}
                    </select>
                    <input style={{display:'none'}} id='rab-walletFromDisk' type='file' onChange={this.loadWalletFromDisk} />
                </div>

                <div className='selectedAddress'>
                    Selected: {this.state.selectedAddress}
                </div>

                <div style={{paddingRight:'20px',float:'right'}}>
                    <button onClick={this.onOk} className='button'>OK</button>
                </div>
            </Modal>
            <EntropyCollector 
                onCancel={this.closeEntropyCollector}
                visible={this.state.entropyCollector}
            />
            <PasswordScreen 
                onProceed={this.onProceed} 
                onCancel={this.closePasswordScreen} 
                visible={this.state.passwordScreen}
            />
            <ConfirmationScreen 
                onConfirm={this.confirmEraseLw} 
                onCancel={this.closeConfirmationScreen} 
                visible={this.state.confirmationScreen}
            />
            <SeedScreen 
                seed={this.state.seed} 
                onCancel={this.closeSeedScreen}
                visible={this.state.seedScreen}
            />
            <EnterSeedScreen 
                onCancel={this.closeEnterSeedScreen} 
                onProceed={this.onProceed} 
                visible={this.state.enterSeedScreen}
            />
            <TransferScreen 
                web3={this.props.web3}
                from={this.state.transferFrom} 
                key={now}
                to={this.state.transferTo}
                onCancel={this.closeTransferScreen} 
                visible={this.state.transferScreen}
            />
        </div>);
    }

});

module.exports = AccountSelector;
