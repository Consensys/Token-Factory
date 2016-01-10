var React        = require('react');
var Images       = require('./Images.js');
var AccountStore = require('../flux/AccountStore.js');
var PersonaStore = require('../flux/PersonaStore.js');
var config       = require('../config.js');

var AddressSpot = React.createClass({

    getInitialState: function() {
        return {dragOver: false};
    },

    componentDidMount: function() {
        var addr = this.treatAddress();
        if (config.personaEnabled) {
            var a = this.props.address;
            if (!a.startsWith('0x')) {
                a = '0x' + this.props.address;
            }
            PersonaStore.get(a)
            .then(function(persona) {
                document.getElementById(addr + '-img').src = persona.img;
                document.getElementById(addr + '-name').innerHTML = persona.name;
            }).catch(function(err) {
                document.getElementById(addr + '-img').src = Images.unknown;
                document.getElementById(addr + '-name').innerHTML = addr;
            });
        }

        AccountStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AccountStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        var selected = AccountStore.getSelectedAddress();
        var compare = this.props.address;
        if (!compare.startsWith('0x')) {
            compare = '0x' + compare;
        }
        if (selected == compare) {
            document.getElementById('rab-as-radio-' + this.props.eid).checked = true;
        } else {
            document.getElementById('rab-as-radio-' + this.props.eid).checked = false;
        }
    },

    onClick: function() {
        document.getElementById('rab-as-radio-' + this.props.eid).checked = true;
        var a = this.props.address;
        if (a.startsWith('0x')) {
            this.props.onSelect(a);
        } else {
            this.props.onSelect('0x'+a);
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
                document.getElementById('rab-as-balance-' + _this.props.eid).innerHTML = value;
            }
        });
        return addr;
    },

    onDragOver: function(ev) {
        ev.preventDefault();
        if (!this.state.dragOver) {
            this.setState({dragOver: true});
        }
    },

    onDragLeave: function(ev) {
        if (this.state.dragOver) {
            this.setState({dragOver: false});
        }
    },

    onDragStart: function(ev) {
        var a = this.props.address;
        if (!a.startsWith('0x')) {
            a = '0x' + a;
        }
        this.props.onDragStart(a);
    },

    onDrop: function() {
        console.log('ondrop: ' + this.props.address);
        if (this.props.onDropFunc) {
            var a = this.props.address;
            if (!a.startsWith('0x')) {
                a = '0x' + a;
            }
            this.props.onDropFunc(a);
        }
        this.setState({dragOver: false});
    },



    render: function() {
        var _this = this;
        var addr = this.treatAddress();

        var style = {borderStyle:'hidden', borderWidth:'1px'};
        if (this.state.dragOver) {
            style.borderStyle = 'solid';
        }

        var table = 
            <table><tbody><tr><td style={{verticalAlign:'middle',padding:'2px'}}rowSpan='2'>
                <input id={'rab-as-radio-' + this.props.eid} type='radio'/>
                <img className='personaImage' id={addr + '-img'} src={Images.unknown}/>
            </td><td id={addr + '-name'} style={{fontSize:'16px',verticalAlign:'middle',padding:'2px'}}>
                {addr}
            </td></tr><tr><td style={{fontSize:'16px',verticalAlign:'middle',padding:'2px'}} 
                id={'rab-as-balance-' + this.props.eid}>
            </td></tr></tbody></table>;

        // TODO: enable way to personalize table below.
        return (
            <div 
                onClick={this.onClick}
                style={style}
                draggable='true' 
                onDragStart={this.onDragStart}
                onDragOver={this.onDragOver} 
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                className='addressSpot'
            >
                {table}
                <br/>
            </div>);
        
    }
});

module.exports = AddressSpot;
