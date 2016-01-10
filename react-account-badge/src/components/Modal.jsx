var React = require('react');

var Modal = React.createClass({

    render: function() {

        var style = {display:'none'};
        if (this.props.visible) {
            style = {};
        }

        var className = this.props.className + ' animated bounceIn';

        return (
            <div style={style} className='background'>
                <div className={className}>
                    <div onClick={this.props.onCancel} className='closeModal'>X</div>
                    <div style={{paddingTop:'10px'}}>{this.props.title}</div>
                    <hr/>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );

    }
});

module.exports = Modal;
