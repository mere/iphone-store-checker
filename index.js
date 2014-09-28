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

console.log("NODE_ENV:", process.env.NODE_ENV)
IS_PROD = process.env.NODE_ENV=="production"

var browserify = require('browserify-middleware');
var express = require('express');
var reactTools = require('react-tools')
var express = require('express');
var app = express();
var mw = require('./js/server/middleware')


var port = IS_PROD? 80 : 3001

var BROWSERIFY_CONFIG = {
  cache: true,
  transform: require('reactify'),
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
app.get('/css/bundle.css', mw.cssMiddleware);

// API
app.get('/api/availability/:country/:locale', mw.availabilityMiddleware);
app.get('/api/stores/:country/:locale', mw.storesMiddleware);
app.get('/api/phones/:country/:locale', mw.phonesMiddleware);
app.get('/api/countries', mw.countriesMiddleware)

// Pages
app.use('/static', express.static(__dirname + '/static'));
app.get('/phones/:country/:locale', mw.indexMiddleware)
app.get('/phones/:country/:locale', mw.serverSideRenderingMiddleware)
app.get('(/about|/)', mw.indexMiddleware)
app.get('(/about|/)', mw.serverSideRenderingMiddleware)

IS_PROD && mw.refreshCountryList()
setTimeout(mw.refreshCountryList, 86400000) //every day

app.listen(port);
console.log("listening on http://localhost:"+port)



