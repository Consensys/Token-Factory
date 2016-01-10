var React = require('react');

var TestC = React.createClass({
    render: function() {
        return (<div onClick={function(){console.log('clickkkkkkkk');}}>ttttttttttttttttt</div>);
    }
});

module.exports = TestC;
