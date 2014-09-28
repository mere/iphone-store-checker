/** @jsx React.DOM */
var React = require('react')
module.exports = React.createClass({
  
  render: function() {
    return (
      <footer className="footer">
        <div className="pure-menu pure-menu-horizontal pure-menu-open">
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="https://github.com/mere/iphone-store-checker/issues" target="_blank">Issues</a></li>
                <li><a href="https://github.com/mere/iphone-store-checker#iphone-store-checker" target="_blank">GitHub</a></li>
                
            </ul>
        </div>
      </footer>
    )

  }
});

