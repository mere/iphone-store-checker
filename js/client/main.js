/**
 * @jsx React.DOM
 */
var React = require('react');
var App = require('../shared/App.jsx');
var model = require('../shared/model/model.js');
module.exports = {};

model.data.country = country
model.data.locale = locale
model.data.page = page

model.refreshCountries(render)
country && locale && model.refreshPhones(render)
country && locale && model.refreshStores(render)
country && locale && model.refreshAvailability(render)
render()
country && locale && check()
function check(){
  render(true)
  model.refreshAvailability(function(){
    render(false)
    setTimeout(check, 6000)
  })

}

function render(updating){
  
  var component = <App 
    data= { model.data }
    updating= { updating }
    />
  React.renderComponent(component, document.body);
  
}

