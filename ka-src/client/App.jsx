Meteor.startup( function() {
  ReactDOM.render( <App />, document.getElementById( "render-target" ) );  
});


var App = React.createClass({
  render() {
    return (
      <h1> Hello world! </h1>
    );
  }
});

