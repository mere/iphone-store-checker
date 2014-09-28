/** @jsx React.DOM */
var React = require('react')
module.exports = React.createClass({
  
  render: function() {
    return (
      <section className="countries">
      <h1 className="content-subhead">
        Choose your country or region:
      </h1>
      {this.props.countries
        .map(function(d) {
          return (
            <figure className="country">
              <a href={"/phones/"+d.code+"/"+d.available[0]+"_"+d.code} >
                <img src={"/static/flags/"+d.code+".png"} />
              </a>  
              <figcaption>
                {d.name}
                <ul>
                {d.available.map(function(lang){
                  return (
                    <li>
                      <a href={"/phones/"+d.code+"/"+lang+"_"+d.code} >
                        {lang}
                      </a>  
                    </li>
                  )
                })}
                </ul>
              </figcaption>
            </figure>  
          )
      })}
      </section>
    )

  }
});

