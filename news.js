const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

let getGeneral = async function(req, res, next){

  function headlines(cat) {

    let opts = {
      country: req.params.country || 'us',
      category: cat,
      pageSize: 8,
    };

    return new Promise((resolve, reject) => {
      newsapi.v2.topHeadlines(opts)
        .then(response => {
          response.category = cat;
          if(response.totalResults === 0) {
            let err = new Error('404 were unable to get any results');
            err.status = 404;
            next(err);
          } else {
            resolve(response);
          }
        })
        .catch((err) => {
            reject(err);
        });
      });
  }

    let business = headlines('business');
    let sports = headlines('sports');
    let tech = headlines('technology');
    let health = headlines('health');
    let entertainment = headlines('entertainment');
    let general = headlines('general');
    let reqCategories = [business, sports, health, tech, entertainment, general];

    await Promise.all(reqCategories)
      .then((response) => {
        if(req.params.country){
          res.status(200);
          res.json(response);
        } else {
          req.countryNews = JSON.stringify(response);
          next();
        }
      })
      .catch((err) => {
        res.status(500);
        err.status = 500;
        next(err);
      });


};

function getCategory(req, res, next){

      let opts = {
        category: req.params.category,
        pageSize: 10
      };

      newsapi.v2.topHeadlines(opts)
        .then(response => {
          if(response.totalResults === 0) {
            let err = new Error('404 were unable to get any results');
            err.status = 404;
            next(err);
          } else {
              res.status(200);
              res.json(response);
          }
        })
        .catch((err) => {
          res.status(500);
          err.status = 500;
          next(err);
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
      if(response.totalResults === 0) {
        let err = new Error('404 were unable to get any results');
        err.status = 404;
        next(err);
      } else {
        if(req.countryNews){
          res.render('home', {
            countryNews: req.countryNews,
            worldNews: JSON.stringify(response)
          })
        } else {
          res.json(response);
          res.status(200);
        }
      }
    })
    .catch((err) => {
        res.status(500);
        err.status = 500;
        next(err);
    });
  }


module.exports = {getGeneral, getCategory, getWorld};
