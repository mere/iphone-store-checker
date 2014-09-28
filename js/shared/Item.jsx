/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  
  render: function() { 
    var cx = React.addons.classSet;
    var classes = {
          item: true
        }
    classes[this.props.color] = true
    var imgCheck = /(iphone6-silver|iphone6-gold|iphone6-gray|iphone6p-silver|iphone6p-gold|iphone6p-gray)/
    var hasImg = imgCheck.test(this.props.colorSwatchUrl)
    var img = hasImg
      ? '/static/'+this.props.colorSwatchUrl.match(imgCheck).pop()+'.png'
      : this.props.colorSwatchUrl
    
    
    return (

      <figure className={cx(classes)}>
        <img src={img} />
        <figcaption>
          <header> {this.props.label}</header>
          <div>{this.props.color}</div>
          <b>{this.props.size}</b>
        </figcaption>
      </figure>
    )
  }

});

