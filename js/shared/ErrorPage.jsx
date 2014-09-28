/** @jsx React.DOM */
var React = require('react')
module.exports = React.createClass({
  
  render: function() {
    return (
      <div >
        <h1 className="content-subhead">Error</h1>
        
        <div className="error">{this.props.message}</div>
      </div>
    )

  }
});

