
/** @jsx React.DOM */
var React = require('react')

var component = React.createClass({
  
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },


  render: function() {
    return (
      <div className="sidebar pure-u-1 pure-u-md-1-4">
              <div className="header">
                  <a href="/"><h1 className="brand-title">iPhone&nbsp;6 Store Checker</h1></a>
                  <h2 className="brand-tagline">Reserve your iPhone 6(plus) from a nearby Apple Store and 
                  <b> pick it up today</b>!
                  </h2>
              </div>

              <div className="share">
                <span className='st_facebook_vcount' displayText='Facebook'></span>
                <span className='st_twitter_vcount' displayText='Tweet'></span>
              </div>
          </div>
    )}
});

module.exports = component