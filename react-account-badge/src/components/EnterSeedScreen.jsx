var React        = require('react');
var Modal        = require('./Modal.jsx');
var AccountStore = require('../flux/AccountStore.js');

var EnterSeedScreen = React.createClass({

    getInitialState: function() {
        return {error:''};
    },

    componentDidMount: function() {
        AccountStore.addErrorListener(this._onError);
    },

    componentWillUnmount: function() {
        AccountStore.removeErrorListener(this._onError);
    },

    _onError: function() {
        this.setState({error: AccountStore.getLastError()});
    },

    _onChange: function() {
        if (this.state.error != '') {
            this.setState({error:''});
        }
    },

    _onProceed: function() {
        var pwd = document.getElementById('rab-ess-pwd').value;
        var seed = document.getElementById('rab-ess-seed').value;
        this.props.onProceed(pwd, seed);
    },

    render: function() {
        return (
            <Modal 
                title='New wallet from seed' 
                onCancel={this.props.onCancel} 
                className='enterSeedScreen'
                visible={this.props.visible}>

                <div>
                    <input id='rab-ess-seed' onChange={this._onChange} placeholder='seed' style={{width:'380px',padding:'5px',fontSize:'20px'}}/>
                </div>
                <div style={{fontSize:'18px',color:'rgba(255,0,0,0.8)'}}>
                    {this.state.error}
                </div>
                <div style={{fontSize:'20px',paddingTop:'15px'}}>
                    Provide a password to encrypt your wallet:
                    <input id='rab-ess-pwd' type='password' placeholder='password' style={{width:'150px',padding:'5px',fontSize:'20px'}}/>
                </div>
                <div>
                    <div style={{float:'right',paddingTop:'15px'}}>
                        <button className='button' onClick={this._onProceed}>OK</button>
                    </div>
                    <div style={{float:'left'}}>
                    </div>
                </div>
            </Modal>);
    }
});

module.exports = EnterSeedScreen;
