/** @jsx React.DOM */
var React = require('react');
var request = require('request');
var Stores = require('../shared/Stores')


var main = {}

main.render = function(cb){
  
  /**
   *  No server-side rendering:
   */
   cb("")

  /**
   *  render a little bit:
   */
  //cb(React.renderComponentToString(<Stores />))

  /**
   *  Full server-side rendering:
   */
  //getSomeData(function(data){ 
  // cb(React.renderComponentToString(<Stores items={data.items} />))  
  //})
   
}

module.exports = main

















function getSomeData(cb){
  setTimeout(function(){
    request('http://localhost:3000/api/Stores'
    , function (error, res, body) {
    if (!error && res.statusCode == 200) {
      cb(JSON.parse(body))
    }
    else {
      console.log("Stores is being flaky...retrying...")
      setTimeout(function(){getSomeData(cb)}, 2000)
    }
  })  
  }, Math.random()*200)
  
}