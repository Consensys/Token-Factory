var React = require('react');
var Modal = require('./Modal.jsx');

var WalletPassword = React.createClass({

    getInitialState: function() {
        return {error:''};
    },

    _onProceed: function() {
        var pwd = document.getElementById('rab-wp-pwd').value;
        document.getElementById('rab-wp-pwd').value = '';
        this.props.onProceed(pwd, this.callback);
    },

    _onChange: function() {
        if (this.state.error != '') {
            this.setState({error: ''});
        }
    },


    callback: function(err) {
        if (err) {
            this.setState({error:''+err});
        }
    },

    onCancel: function() {
        document.getElementById('rab-wp-pwd').value = '';
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
                        id='rab-wp-pwd' 
                        onChange={this._onChange} 
                        type='password' 
                        style={{width:'150px',padding:'5px',fontSize:'24px'}}
                    />
                    <div style={{fontSize:'18px',color:'rgba(255,0,0,0.8)'}}>
                        {this.state.error}
                    </div>
                </div>
                <div>
                    <div style={{float:'right',paddingTop:'20px'}}>
                        <button className='button' onClick={this._onProceed}>OK</button>
                    </div>
                </div>

            </Modal>);
    }
});

module.exports = WalletPassword;
