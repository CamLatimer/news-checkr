const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const countryNews = require('./news.json');
const worldNews = require('./worldNews.json');

function getGeneral(req, res, next){

    let opts = {
      country: req.params.country || 'us',
      category: 'general',
      pageSize: 4,
    };

    newsapi.v2.topHeadlines(opts)
      .then(response => {
        handleResponse(response, res, next)
      })
      .catch((err) => {
        handleErrors(err, res, next);
      });

};

function getCategory(req, res, next){

      let opts = {
        category: req.params.category,
        pageSize: 10
      };

      newsapi.v2.topHeadlines(opts)
        .then(response => {
          handleResponse(response, res, next)
        })
        .catch((err) => {
          handleErrors(err, res, next);
        });

}

function getWorld(req, res, next){

  let opts = {
    category: 'general',
    pageSize: 10
  };
  if(req.params.page){
    opts.page = req.params.page;
  }


  newsapi.v2.topHeadlines(opts)
    .then(response => {
      handleResponse(response, res, next)
    })
    .catch((err) => {
      handleErrors(err, res, next);
    });
  }

  function searchNews(req, res, next){
    let opts = {
      q: req.query.q,
      sortyBy: 'relevancy',
    }

    if(req.query.page){
      opts.page = req.query.page;
    }

    newsapi.v2.everything(opts)
      .then(response => {
        handleResponse(response, res, next)
      })
      .catch((err) => {
        handleErrors(err, res, next);
      });
  }

  function handleResponse(response, res, next){
    if(response.totalResults === 0) {
      let err = new Error('404 were unable to get any results');
      err.status = 404;
      next(err);
    } else {
        res.status(200);
        res.json(response);
    }
  }

  function handleErrors(err, res, next){
    res.status(500);
    err.status = 500;
    next(err);
  }


module.exports = {getGeneral, getCategory, getWorld, searchNews};
