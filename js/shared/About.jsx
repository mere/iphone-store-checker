/** @jsx React.DOM */
var React = require('react')
module.exports = React.createClass({
  
  render: function() {
    return (
      <div className="posts">
        <h1 className="content-subhead">
          About this site 
        </h1>

        <p>
          iPhone Store Checker is a tiny weekend-project by <a href="http://zoltanb.co.uk" target="_blank">Zoltan Bourne</a> for making iPhone reservations super simple.
        </p>
        <p>
          The site is created with <a href="http://purecss.io">purecss 
          </a> and <a href="http://facebook.github.io/react/index.html">ReactJS</a>.
        </p>
        
      </div>
    )

  }
});

