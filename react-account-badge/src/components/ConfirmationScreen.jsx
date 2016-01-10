var React = require('react');
var Modal = require('./Modal.jsx');

var ConfirmationScreen = React.createClass({

    render: function() {
        return (
            <Modal
                title='Confirm'
                className='passwordScreen'
                onCancel={this.props.onCancel}
                visible={this.props.visible}>

                <div style={{fontSize:'18px'}}>
                    Are you sure you want to remove your wallet from your local 
                    storage (browser)?
                </div>
                <div>
                    <div style={{float:'right',paddingTop:'20px'}}>
                        <button className='button' onClick={this.props.onConfirm}>YES</button>
                        <button className='button' onClick={this.props.onCancel}>NO</button>
                    </div>
                </div>

            </Modal>);
    }
});

module.exports = ConfirmationScreen;
