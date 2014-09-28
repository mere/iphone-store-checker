/** @jsx React.DOM */
var React = require('react')
var Store = require('./Store.jsx')
var Footer = require('./Footer.jsx')

var Stores = React.createClass({
 

  render: function() {
    var data = this.props.data
    var availability = data.availability
    var stores = this.props.data.stores.stores
    var country = this.props.data.countryObj||{}
    var updating = this.props.updating
    return (
      <div className="posts">
        <h1 className="content-subhead">Apple stores in 
          {country.name=="United Kingdom"?" The ":" "}
          {country.name||"..."}
          <img src="/static/ajax-loader.gif" 
            title="Refreshing data..."
            className={updating?'loader':'loader is-hidden'} />
        </h1>
        {!stores
          ? <div className="error">
            No Store Information available at the moment. Please try again later.
          </div>
          :stores.map(function(item) {
          return (
              <Store
                key={item.storeNumber}
                name={item.storeName}
                id={item.storeNumber}
                availability = {availability[item.storeNumber]}
                data = {data}
                />
          )
        })}
        

    </div>
    )}
});

module.exports = Stores