var React        = require('react');
var Images       = require('./Images.js');
var Modal        = require('./Modal.jsx');
var AccountStore = require('../flux/AccountStore.js');

var TransferScreen = React.createClass({

    getInitialState: function() {
        return {
            transfering: false, 
            to: this.props.to,
            error: '',
        };
    },

    onChangeTo: function() {
        this.setState({to:document.getElementById('rab-ts-to').value});
    },

    onError: function(err) {
        this.setState({error:err});
    },

    transfer: function() {
        var _this = this;
        var v = document.getElementById('rab-ts-amount').value;
        this.props.web3.eth.sendTransaction({
            from: this.props.from,
            to: this.props.to,
            value: v * Math.pow(10,18),
            gas: 50000
        }, function(err, hash) {
            if (err) {
                console.log(err);
                _this.onError(''+err);
                return;
            }
            _this.setState({transfering: true});
            var interval = setInterval(function() {
                _this.props.web3.eth.getTransactionReceipt(hash, function(err, receipt) {
                    if (receipt != null) {
                        clearInterval(interval);
                        if (_this.isMounted()) {
                            _this.setState({transfering:false});
                            _this.props.onCancel();
                        }
                    } else {
                        console.log('waiting');
                    }
                });
            }, 1000);
        });
    },

    render: function() {
        return (
            <Modal
                title='Transfer funds'
                className='transferScreen'
                onCancel={this.props.onCancel}
                visible={this.props.visible}>

                <table>
                    <tbody style={{fontSize:'16px'}}>
                    <tr>
                    <td>From:</td><td> {this.props.from}</td>
                    </tr><tr>
                    <td>To:</td><td>
                        <input 
                            id='rab-ts-to'
                            style={{padding:'5px',fontSize:'16px',width:'370px'}} 
                            value={this.props.to}
                            onChange={this.onChangeTo}
                        /></td>
                    </tr><tr>
                    <td>Value:</td><td><input id='rab-ts-amount' style={{padding:'5px',fontSize:'16px',width:'75px'}}/> Ethers</td>
                    </tr></tbody>
                </table>
                <div style={{fontSize:'18px',color:'rgba(255,0,0,0.8)'}}>
                    {this.state.error}
                </div>
                <div>
                    <div style={{float:'right',paddingTop:'20px'}}>
                        {this.state.transfering ? 
                            <img width='30px' height='30px' style={{marginTop:'20px',marginRight:'10px'}} src={Images.wait}/>
                        :
                            <button className='button' onClick={this.transfer}>OK</button>
                        }
                    </div>
                    <div style={{fontSize:'18px',color:'rgba(255,0,0,0.8)',float:'left'}}>
                    </div>
                </div>

            </Modal>);
    }
});

module.exports = TransferScreen;
