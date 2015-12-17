var FactoryPage = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    }
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div>
        <TXComponent filter={{txType: "token_creation"}}>
            <CreateTokenForm />
        </TXComponent>
        ---
        (show what tokens current selected address has created).
      </div>
    );
  }
});

window.FactoryPage = FactoryPage;
