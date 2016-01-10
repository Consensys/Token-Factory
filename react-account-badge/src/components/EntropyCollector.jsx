var React        = require('react');
var SeedAndPwd   = require('./SeedAndPwd.jsx');
var Modal        = require('./Modal.jsx');
var Actions      = require('../flux/Actions.js');
var AccountStore = require('../flux/AccountStore.js');

var EntropyCollector = React.createClass({

    getInitialState: function() {
        return {
            missing: 500,
            entropy: '',
            words: '',
            seedAndPwdScreen: false
        };
    },

    onMouseMove: function(e) {
        if (!this.props.visible) {
            return;
        }
        if (this.state.missing < 1) {
            Actions.newLightWalletEntropy(this.state.entropy);
            this.setState({seedAndPwdScreen:true,missing:500});
        } else {
            var curr = this.state.entropy;
            curr += String.fromCharCode((e.pageX+e.pageY) % (127-32) + 32);
            this.setState({
                missing:(this.state.missing-1),
                entropy: curr
            });
        }
    },

    componentDidMount: function() {
        AccountStore.addChangeListener(this._onChange);
        document.addEventListener('mousemove', this.onMouseMove);
    },

    componentWillUnmount: function() {
        AccountStore.removeChangeListener(this._onChange);
        document.removeEventListener('mousemove', this.onMouseMove);
    },

    _onChange: function() {
        this.setState({words: AccountStore.getTempSeed()});
    },

    onCreate: function(pwd) {
        this.onCancel();
        var seed = this.state.words;
        setTimeout(function() {
            Actions.newLightWallet(pwd, seed);
        }, 100);
    },

    onCancel: function() {
        this.setState({seedAndPwdScreen: false, missing:500});
        this.props.onCancel();
    },

    render: function() {
        return (<div>
            <Modal
                title='New light wallet'
                className='entropyCollector'
                onCancel={this.onCancel}
                visible={this.props.visible}>

                <div style={{fontSize:'18px'}}>
                    Move your mouse around to provide some 
                    entropy: {this.state.missing}
                </div>

            </Modal>
            <SeedAndPwd 
                onCreate={this.onCreate} 
                words={this.state.words}
                onCancel={this.onCancel}
                visible={this.state.seedAndPwdScreen}
            />
        </div>);
        
    }
});

module.exports = EntropyCollector;
