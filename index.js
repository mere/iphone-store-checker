/**
 *  transform jsx files on the fly
 *  with prod code probably you want to precompile them instead
 */
var fs = require('fs')
require.extensions['.jsx'] = function(module, filename) {
  var source = fs.readFileSync(filename, {encoding: 'utf8'})
  try { source = reactTools.transform(source)} catch (e) {throw new Error('Error transforming ' + filename + ' from JSX: ' + e.toString())}
  module._compile(source, filename)
}

var request = require('request')
var browserify = require('browserify-middleware');
var reactify = require('reactify');
var express = require('express');
var reactTools = require('react-tools')
var express = require('express');
var app = express();
var main = require('./js/server/main')
var countries = require('./js/shared/model/countries.json')

var BROWSERIFY_CONFIG = {
  cache: true,
  transform: reactify,
  debug: true         
}

browserify.settings.development('basedir', __dirname);

app.param('country', function (req, res, next, country) {
  req.country = /^[a-zA-Z._]{2,6}$/.test(country)? country : ""
  next()
})

app.param('locale', function (req, res, next, locale) {
  req.locale = /^[a-zA-Z._]{2,6}$/.test(locale)? locale : ""
  next()
})

app.get('/js/bundle.js', browserify('./js/client/main.js', BROWSERIFY_CONFIG));
app.get('/css/bundle.css', cssMiddleware);

// API
app.get('/api/availability/:country/:locale', availabilityMiddleware);
app.get('/api/stores/:country/:locale', storesMiddleware);
app.get('/api/phones/:country/:locale', phonesMiddleware);
app.get('/api/countries', countriesMiddleware)

// Pages
app.use('/static', express.static(__dirname + '/static'));
app.get('/phones/:country/:locale', indexMiddleware)
app.get('/phones/:country/:locale', serverSideRenderingMiddleware)
app.get('(/about|/)', indexMiddleware)
app.get('(/about|/)', serverSideRenderingMiddleware)
app.listen(3001);

console.log("listening on http://localhost:3001")

if(process.env['http_proxy']) request = request.defaults({ proxy: process.env['http_proxy']});



function indexMiddleware(req,res, next){
  indexHTML(function send(data){
      res.setHeader('Content-Type', 'text/html');
      res.body = data
      next()
  })
}

function cssMiddleware(req,res, next){
  if (!cssMiddleware.cache) {
    var files = [
      fs.readFileSync("./node_modules/purecss/pure.css","utf8"),
      fs.readFileSync("./node_modules/purecss/grids-responsive.css","utf8"),
      fs.readFileSync("./static/styles.css","utf8")
    ]
    cssMiddleware.cache = files.join("\n")
  }
    
  res.setHeader('Content-Type', 'text/css');
  res.send(cssMiddleware.cache)
}


function availabilityMiddleware(req,res, next){
  var country = req.country
  var locale = req.locale
  if (!country || !locale) {
    res.json({})
    return;
  }
  var url = "https://reserve.cdn-apple.com/"+ country+"/"+locale +"/reserve/iPhone/availability.json"
  request(url).pipe(res)  
}

function storesMiddleware(req,res, next){
  var country = req.country
  var locale = req.locale
  if (!country || !locale) {
    res.json({ stores: [] })
    return;
  }
  var url = "https://reserve.cdn-apple.com/"+ country+"/"+locale +"/reserve/iPhone/stores.json"
  request(url).pipe(res)  
}

function phonesMiddleware(req,res, next){
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

function countriesMiddleware(req,res, next){

  // dev
  return res.json(countries.filter(function(d){return d.available.length}))

  //prod
  var numPending = 0
  countries.forEach(function(country){
    country.available = []
    country.languages.forEach(function(lang){
      check(country, lang)
    })
  })

  function check(country, lang){
    numPending++
    var url = "https://reserve.cdn-apple.com/"+ country.code+"/"+lang+"_"+country.code +"/reserve/iPhone/availability"
    request(url, function (error, response, body) {      
    if (!error && response.statusCode == 200) {
        country.available.push(lang)
      }      
      if (!--numPending) res.json(countries)
    }).setMaxListeners(0)
  }
}


function serverSideRenderingMiddleware(req,res, next){
  var path = req.path.match(/^[\/](.*[^\/])(?:[\/]$|$)/) // remove root and trailing slash
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