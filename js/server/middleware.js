var request = require('request')
var fs = require('fs')
var main = require('./main')
var countries = require('../shared/model/countries.json')
var self = {}

if(process.env['http_proxy']) request = request.defaults({ proxy: process.env['http_proxy']});


self.indexMiddleware = function(req,res, next){
  indexHTML(function send(data){
    res.setHeader('Content-Type', 'text/html');
    res.body = data
    next()
  })
}

self.cssMiddleware = function(req,res, next){
  if (!self.cssMiddleware.cache) {
    var files = [
      fs.readFileSync("./node_modules/purecss/pure.css","utf8"),
      fs.readFileSync("./node_modules/purecss/grids-responsive.css","utf8"),
      fs.readFileSync("./static/styles.css","utf8")
    ]
    self.cssMiddleware.cache = files.join("\n")
  }
    
  res.setHeader('Content-Type', 'text/css');
  res.send(self.cssMiddleware.cache)
}

self.availabilityMiddleware = function(req,res, next){
  var country = req.country
  var locale = req.locale
  if (!country || !locale) {
    res.json({})
    return;
  }
  var url = "https://reserve.cdn-apple.com/"+ country+"/"+locale +"/reserve/iPhone/availability.json"
  request(url).pipe(res)  
}

self.storesMiddleware = function(req,res, next){
  var country = req.country
  var locale = req.locale
  if (!country || !locale) {
    res.json({ stores: [] })
    return;
  }
  var url = "https://reserve.cdn-apple.com/"+ country+"/"+locale +"/reserve/iPhone/stores.json"
  request(url).pipe(res)  
}

self.phonesMiddleware = function(req,res, next){
  var country = req.country
  var locale = req.locale

  if (!country || !locale) {
    res.json({ products: [] })
    return;
  }
  var url = "https://reserve.cdn-apple.com/"+ country+"/"+locale +"/reserve/iPhone/availability"
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.setHeader('Content-Type', 'application/json');
      var match = body.match(/var RPData = (.*)<\/script>/)
      var phones = (match.length==2)? match.pop(): {}
      var data = phones.replace(/\\/g,"")
      res.json(JSON.parse(data))
    }
    else next()
  })
}

self.countriesMiddleware = function(req,res, next){
  res.json(countries.filter(function(d){return d.available.length}))
}

self.serverSideRenderingMiddleware = function(req,res, next){
  var path = req.path.match(/^[\/](.*[^\/])(?:[\/]$|$)/) // remove root and trailing slash
  var model = require("../shared/model/model")()  
  main.render(function(data){
    var body = res.body
      .replace("{country}", req.country?"'"+req.country+"'":"null")
      .replace("{locale}", req.locale?"'"+req.locale+"'": "null")
      .replace("{page}", path?path.pop():'')
      .replace("<!--contents-->", data) 
    res.send(body)
  })
}

function indexHTML(cb){
  if (indexHTML.data) return cb(indexHTML.data)
  fs.readFile("./static/index.html", 'utf8', 
    function (err, data) {
    if (err) {
      return console.error(err);
    }
    indexHTML.data = data
    cb(data);
  });
}

self.refreshCountryList = function(){
  var numPending = 0
    , numFound = 0
  countries.forEach(function(country){
    country.languages.forEach(function(lang){
      check(country, lang)
    })
  })
  console.log("checking", numPending, "regions")
  function check(country, lang){
    numPending++
    var url = "https://reserve.cdn-apple.com/"+ country.code+"/"+lang+"_"+country.code +"/reserve/iPhone/availability"
    setTimeout(function(){
      request(url, function (error, response, body) {      
        if (!error && response.statusCode == 200) {
            if (!~country.available.indexOf(lang)) {
              country.available.push(lang)
            }
            numFound++
          }      
          if (!--numPending) {
            console.log("found", numFound, "regions")
          }
        }).setMaxListeners(0)
      }
      ,numPending*50
      )
  }
}

module.exports = self
