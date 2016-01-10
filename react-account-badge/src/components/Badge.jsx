var React        = require('react');
var Images       = require('./Images.js');
var PersonaStore = require('../flux/PersonaStore.js');
var config       = require('../config.js');

var AddressSpot = React.createClass({

    getInitialState: function() {
        return {dragOver: false};
    },

    componentWillMount: function() {
        var ipfs = config.ipfsProvider.split(':');
        if (config.personaEnabled) {
            PersonaStore.init(
                'http://' + config.web3Provider, 
                {host:ipfs[0], port:ipfs[1]}, 
                config.personaRegistry,
                config.personaCacheTimeout
            );
        }
    },

    onClick: function() {
        var a = this.props.address;
        if (a.startsWith('0x')) {
            this.props.onClick(a);
        } else {
            this.props.onClick('0x'+a);
        }
    },

    treatAddress: function() {
        if (this.props.address.length == 0) {
            return '';
        }
        var a = this.props.address;
        if (!a.startsWith('0x')) {
            a = '0x' + a;
        }
        var addr = a.substring(0,20) + '...';
        var _this = this;
        this.props.web3.eth.getBalance(this.props.address, function(err, data) {
            if (err) {
                console.error(err);
                return;
            }
            if (_this.isMounted()) {
                var value = (data / Math.pow(10,18)).toFixed(2) + " Ethers";
                document.getElementById('rab-b-balance-' + _this.props.eid).innerHTML = value;
            }
        });
        return addr;
    },

    render: function() {
        var _this = this;
        if (config.personaEnabled) {
            PersonaStore.get(this.props.address)
            .then(function(persona) {
                document.getElementById('rab-selected-persona-img').src = persona.img;
                document.getElementById('rab-selected-persona-name').innerHTML = persona.name;
            }).catch(function(err) {
                document.getElementById('rab-selected-persona-img').src = Images.unknown;
                document.getElementById('rab-selected-persona-name').innerHTML = _this.treatAddress();
                //console.error(err);
            });
        }

        var table = 
            <table><tbody><tr><td style={{verticalAlign:'middle',padding:'2px'}}rowSpan='2'>
                <img className='personaImage' id='rab-selected-persona-img' src={Images.unknown}/>
            </td><td id='rab-selected-persona-name' style={{fontSize:'16px',verticalAlign:'middle',padding:'2px'}}>
                {this.treatAddress()}
            </td></tr><tr><td style={{fontSize:'16px',verticalAlign:'middle',padding:'2px'}} 
                id={'rab-b-balance-' + this.props.eid}>
            </td></tr></tbody></table>;

        // TODO: enable way to personalize table below.
        return (
            <div onClick={this.onClick} className='addressSpot'>
                {table}
                <br/>
            </div>
        );
        
    }
});

module.exports = AddressSpot;
