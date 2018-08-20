require('dotenv').load();

const express = require('express');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const news = require('./news');
const Bundler = require('parcel-bundler');
const bundleOpts = require('./bundleConfig');
const bundleJs = new Bundler(__dirname + '/dist/js/entry.js', bundleOpts);

// middleware
if(process.env.NODE_ENV !== 'test') { app.use(logger('dev')); }
app.use(express.static(__dirname + '/dist'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
if(process.env.NODE_ENV === 'development'){ app.use(bundleJs.middleware()); }

// routes
app.get('/', (req, res, next) => { res.render('home'); });
app.get('/country/:country', news.getGeneral);
app.get('/world', news.getWorld);
app.get('/world/:page', news.getWorld);
app.get('/category/:category', news.getCategory);
app.get('/search', news.searchNews)
app.get('/*', (req, res, next) => {
  res.render('home');
})

// error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  res.status(err.status);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })

});

if(process.env.NODE_ENV == 'test'){
  module.exports = { app };
} else {
  app.listen(process.env.PORT || 8080, () => {
      console.log('The application is running!');
  });
}
