var React = require('react');
var Modal = require('./Modal.jsx');

var SeedAndPwd = React.createClass({

    ok: function() {
        this.props.onCreate(document.getElementById('rab-sap-pwd').value);
    },

    render: function() {
        return (
            <Modal
                title='New light wallet'
                className='entropyCollector'
                onCancel={this.props.onCancel}
                visible={this.props.visible}>

                <div style={{fontSize:'18px'}}>
                    Your seed words:
                    <div className='styleSeed'>{this.props.words}</div>
                    <div>
                        Now, make sure to write these words down. If you loose them, you 
                        will not be able to recover your wallet.
                    </div>
                    <div style={{paddingTop:'10px'}}>
                        Enter a password to encrypt your wallet:
                        <input style={{padding:'5px',width:'150px'}} id='rab-sap-pwd' type='password'/>
                    </div>
                    <div style={{float: 'right'}}>
                        <button className='button' onClick={this.ok}>OK</button>
                    </div>
                </div>

            </Modal>
        );
    }

});

module.exports = SeedAndPwd;
