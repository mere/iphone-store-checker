/** @jsx React.DOM */
var React = require('react/addons');
var Item = require('./Item.jsx');

module.exports = React.createClass({
  
  render: function() { 
    var availability = this.props.availability
    var phones = this.props.data.phones
    var filteredPhones = phones
      .filter(function(d){ return availability[d.partNumber] })

    return (
        <section className="post">
            <header className="post-header">
                
                <h2 className="post-title">{this.props.name}
                  {filteredPhones.length
                      ?<span className="title-message in-stock">
                        In Stock! 
                      </span>
                      : <span className="title-message">Sold out.</span>
                    }
                </h2>
                {filteredPhones.length
                  ?<p className="post-meta">

                      <a className="button-secondary pure-button" 
                      href={this.props.data.stores.reservationURL}
                      target="_blank"
                      >
                        Start Your Reservation
                      </a>
                    <p>The following phones are available for collection today:</p>
                    </p>
                  : ''
                }
            </header>

            <div className="post-description">
            <a  
                      href={this.props.data.stores.reservationURL}
                      target="_blank"
                      >
              {filteredPhones
                .map(function(item) {
              return (
                  <Item
                    key={item.partNumber}
                    label={item.localizedName}
                    color={item.color}
                    name= {item.name}
                    colorSwatchUrl= {item.colorSwatchUrl}
                    size={item.size}
                    />
              )
            })}
              </a>
            </div>
        </section>
    )
  }

});

