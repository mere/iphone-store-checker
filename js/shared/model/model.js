module.exports = function(){
  var data = {
    stores: null,
    lastUpdated: null,
    availability: null,
    phones: null,
    country: null,
    locale: null,
    error:null,
    countries:[],
    countryObj: null
  }



  function region(){
    return '/'+data.country+'/'+data.locale
  }
  function refreshPhones(cb){
    xhr("/api/phones"+region(), function(d){
      data.phones = []
      d && d.products.forEach(function(d){
        var localizedName = d.localizedName
        var name = d.name
        d.sizes.forEach(function(d){
          var size = d.size
          d.colors.forEach(function(d){
            data.phones.push(d)
            d.size = size
            d.color = d.name
            d.name = name
            d.localizedName = localizedName
          })
        })
      })
      //console.log("Phones loaded", d, data.phones)
      cb()
    })
  }

  function refreshStores(cb){
    xhr("/api/stores"+region(), function(d){
      //console.log("Stores loaded", d)
      data.stores = d
      cb()
    })
  }

  function refreshAvailability(cb){ 
    xhr("/api/availability"+region(), function(d){
      //console.log("Availability loaded", d)
      data.lastUpdated = new Date()
      data.availability = d
      cb()    
    })
  }

  function refreshCountries(cb){ 
    xhr("/api/countries", function(d){
      //console.log("Countries loaded", d)
      data.countries = d
      data.countryObj = d.filter(function(d){ return d.code==data.country}).pop()
      cb()    
    })
  }

  function xhr(url, cb){
    var http = require('http');
    http.get({ path : url }, function (res, error) {
      if (error || res.statusCode != 200) {
        data.error = "I can't find any stores for this location ( " + data.country + ' | ' + data.locale+ " )"
        cb()
        return 
      }
      var buffer = ""
      res.on('data', function (buf){ buffer += buf; });
      res.on('end', function () {
        cb(JSON.parse(buffer))
      });
    })
  }


  return {
    refreshStores: refreshStores,
    refreshPhones: refreshPhones,
    refreshCountries: refreshCountries,
    refreshAvailability: refreshAvailability,
    data:data
  }
  
}
