var React        = require('react');
var Web3         = require('web3');
var ReactDOM     = require('react-dom');
var AccountBadge = require('react-account-badge').AccountBadge;

var web3 = new Web3();

var Main = React.createClass({
    render: function() {
        require('react-account-badge').enablePersona();
        var style_main  = 
            {padding: '15px', backgroundColor:'red', width:'1500px', height:'800px'};
        var style_left  = 
            {padding: '10px', backgroundColor:'blue', float: 'left'};
        var style_right = 
            {padding: '10px', backgroundColor:'white', width:'250px', height:'80px', float: 'right'};
        return (
            <div style={style_main}>
                <div style={style_left}/>
                <div style={style_right}>
                    <AccountBadge web3={web3}/>
                </div>
            </div>);
    }
});

ReactDOM.render(<Main/>, document.getElementById('react-mount'));
