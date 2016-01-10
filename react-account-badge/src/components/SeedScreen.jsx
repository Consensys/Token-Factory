var React = require('react');
var Modal = require('./Modal.jsx');

var SeedScreen = React.createClass({

    render: function() {
        return (
            <Modal
                title='Seed of your wallet'
                className='passwordScreen'
                onCancel={this.props.onCancel}
                visible={this.props.visible}>

                <div className='styleSeed'>
                    {this.props.seed}
                </div>
                <div>
                    <div style={{float:'right',paddingTop:'20px'}}>
                        <button className='button' onClick={this.props.onCancel}>OK</button>
                    </div>
                </div>

            </Modal>);
    }
});

module.exports = SeedScreen;
