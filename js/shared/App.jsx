
/** @jsx React.DOM */
var React = require('react')
var Sidebar = require('./Sidebar.jsx')
var Footer = require('./Footer.jsx')
var Stores = require('./Stores.jsx')
var ErrorPage = require('./ErrorPage.jsx')
var Countries = require('./Countries.jsx')
var ShareButtons = require('./ShareButtons.jsx')
var About = require('./About.jsx')

var component = React.createClass({
  
  render: function() {
    var availability = this.props.availability
    var data = this.props.data
    var updating= this.props.updating
    return (
      <div id="layout" className="pure-g">
          <Sidebar data={ data} />

          <div className="content pure-u-1 pure-u-md-3-4">
            <ShareButtons />
            {data.error? <ErrorPage message={data.error}/>:'' }

            {data.page=="about" && <About />}


            { data.country && data.locale
              ?<div>
                {data.stores
                  && data.availability
                  && data.phones
                  ? <Stores data={data} updating={updating} />
                  : <h1 className="content-subhead">
                      Loading...
                    </h1>
                }
              </div>
              : data.page!="about" && <Countries countries={data.countries} />
            }

            <Footer data={data} />
          </div>
      </div>
    )}
});

module.exports = component