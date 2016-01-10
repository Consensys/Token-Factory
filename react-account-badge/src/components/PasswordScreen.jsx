var React        = require('react');
var Modal        = require('./Modal.jsx');
var AccountStore = require('../flux/AccountStore.js');

var PasswordScreen = React.createClass({

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
            this.setState({error: ''});
        }
    },

    _onProceed: function() {
        var pwd = document.getElementById('rab-ps-pwd').value;
        document.getElementById('rab-ps-pwd').value = '';
        this.props.onProceed(pwd);
    },

    onCancel: function() {
        document.getElementById('rab-ps-pwd').value = '';
        this.props.onCancel();
    },

    render: function() {
        return (
            <Modal
                title='Enter your wallet password'
                className='passwordScreen'
                onCancel={this.onCancel}
                visible={this.props.visible}>

                <div>
                    <input 
                        id='rab-ps-pwd' 
                        onChange={this._onChange} 
                        type='password' 
                        style={{width:'150px',padding:'5px',fontSize:'24px'}}
                    />
                </div>
                <div>
                    <div style={{float:'right',paddingTop:'20px'}}>
                        <button className='button' onClick={this._onProceed}>OK</button>
                    </div>
                    <div style={{fontSize:'18px',color:'rgba(255,0,0,0.8)',float:'left'}}>
                        {this.state.error}
                    </div>
                </div>

            </Modal>);
    }
});

module.exports = PasswordScreen;
