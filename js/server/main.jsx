/** @jsx React.DOM */
var React = require('react');
var request = require('request');
var App = require('../shared/App')


var main = {}

main.render = function(model, cb){
  
  /**
   *  No server-side rendering:
   */
  //cb("")

  /**
   *  render a little bit:
   */
  cb(React.renderComponentToString(<App data={model.data} updating={false} />))

  /**
   *  Full server-side rendering:
   */
  //getSomeData(function(data){ 
  // cb(React.renderComponentToString(<Stores items={data.items} />))  
  //})
   
}

module.exports = main
