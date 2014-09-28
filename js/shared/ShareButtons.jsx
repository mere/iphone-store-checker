/** @jsx React.DOM */
var React = require('react')
module.exports = React.createClass({
  
  render: function() {
    return (
      <div className="share-buttons">
        <a href="http://www.facebook.com/sharer.php?u=http://www.iphonestorechecker.com" target="_blank"><img src="/static/share/facebook.png" alt="Facebook" /></a>
         
        <a href={"http://twitter.com/share?url=http://www.iphonestorechecker.com&text=Awesome site that helps you reserve and pick up a new iPhone 6 today! \n&hashtags=iphonestorechecker"} target="_blank"><img src="/static/share/twitter.png" alt="Twitter" /></a>
         
      </div>
    )
        //<a href="https://plus.google.com/share?url=http://www.iphonestorechecker.com" target="_blank"><img src="/static/share/google.png" alt="Google" /></a>
         
        //<a href="http://www.digg.com/submit?url=http://www.iphonestorechecker.com" target="_blank"><img src="/static/share/diggit.png" alt="Digg" /></a>
         
        //<a href="http://reddit.com/submit?url=http://www.iphonestorechecker.com&title=Simple Share Buttons" target="_blank"><img src="/static/share/reddit.png" alt="Reddit" /></a>
         
        //<a href="http://www.linkedin.com/shareArticle?mini=true&url=http://www.iphonestorechecker.com" target="_blank"><img src="/static/share/linkedin.png" alt="LinkedIn" /></a>
         
        //<a href="http://www.stumbleupon.com/submit?url=http://www.iphonestorechecker.com&title=Simple Share Buttons" target="_blank"><img src="/static/share/stumbleupon.png" alt="StumbleUpon" /></a>
         

  }
});

