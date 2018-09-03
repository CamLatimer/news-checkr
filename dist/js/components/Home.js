import React from "react";
import axios from 'axios';
import LazyLoad from 'react-LazyLoad';
import ReactTransition from 'react-addons-css-transition-group';

class Home extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    country: 'us',
    countryNews: [],
    worldNews: [],
    countryNewsLoaded: false,
    worldNewsLoaded: false,
    worldPage: 1,
  }
  this.toggleCountry = this.toggleCountry.bind(this);
  this.getMoreNews = this.getMoreNews.bind(this);
  this.getCountryNews = this.getCountryNews.bind(this);
  this.getWorldNews = this.getWorldNews.bind(this);
}

toggleCountry(event){
  let country = event.target.value;
  axios.get(`${process.env.HOSTDOMAIN}/country/${country}`)
  .then((response) => {
    this.setState({
      country: country,
      countryNews: response.data.articles,
    })
  }).catch((err) => {
      console.log(err);
      this.setState({
        searchResults: 'error'
      })
    });
}

getCountryNews(){
  axios.get(`${process.env.HOSTDOMAIN}/country/${this.state.country}`)
  .then((response) => {
    this.setState({
      countryNews: response.data.articles,
      countryNewsLoaded: true
    });
  }).catch((err) => {
    console.log(err);
  })
}

getWorldNews(){
  axios.get(`${process.env.HOSTDOMAIN}/world`)
  .then((response) => {
    this.setState({
      worldNews: response.data.articles,
      worldNewsLoaded: true

    });
  }).catch((err) => {
    console.log(err);
    this.setState({
      worldNews: 'error'
    })
  })
}

getMoreNews(direction){
  let pageNum = direction === 'next' ? this.state.worldPage + 1 : this.state.worldPage - 1;
  let totalWorld = this.state.worldNews;
  axios.get(`${process.env.HOSTDOMAIN}/world/${pageNum}`)
  .then((response) => {
    this.setState({
      worldNews: totalWorld.concat(response.data.articles),
      worldPage: pageNum
    });
  }).catch((err) => {
    console.log(err);
    this.setState({
      searchResults: 'error'
    })
  })
}

componentDidMount(){
  if(this.props.searching === true){
    this.props.history.push('/results');
  } else {
      if(this.state.countryNewsLoaded === false){
        this.getCountryNews()
      }
      if(this.state.worldNewsLoaded === false){
        this.getWorldNews();
      }
  }
}

componentWillUnmount(){
  this.setState({
    countryNewsLoaded: false,
    worldNewsLoaded: false
  })
}


  render() {
      return (
        <section className='homeNews newsWrapper'>
          <section className="countryNews">
            <header className="newsHeader countryNewsHeader">
              <h1>
                TOP HEADLINES for
                <CountrySelector  country={this.state.country} toggleCountry={this.toggleCountry} />
              </h1>
            </header>

            <ul className="articleGrid articleGrid--country">
            {this.state.countryNewsLoaded === true &&
              this.state.countryNews.map((article, index) =>
                <li  className="article countryArticle" key={index} >
                  <a href={article.url} target="_blank">
                <header>
                  <h3>{article.title}</h3>
                  <h5>({article.source.name})</h5>
                  <p>
                    {article.description}
                  </p>
                </header>
                <LazyLoad height={200} offset={200}>
                  <ReactTransition
                    transitionName="lazyImg"
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={500}>
                    <img
                      key={index}
                      src={article.urlToImage}
                      onError={(event) => {
                          event.target.src="https://via.placeholder.com/350x150" }} />
                  </ReactTransition>
                </LazyLoad>
                  </a>
              </li>)}
            </ul>
          </section>

          <section className="worldNews">
            <header className="newsHeader">
              <h1>TOP HEADLINES WORLDWIDE</h1>
            </header>
            <ul className="articleGrid">
              {this.state.worldNewsLoaded === true &&
                this.state.worldNews.map((article, index) =>
                    <li  key={index} className="article articleGrid--small">
                      <a href={article.url} target="_blank"
                        className=" articleGrid--small">
                      <header>
                        <h3>{article.title}</h3>
                        <h5>({article.source.name})</h5>
                        <p>
                          {article.description}
                        </p>
                      </header>
                      <div>
                        <LazyLoad height={200} offset={200}>
                          <ReactTransition
                            transitionName="lazyImg"
                            transitionAppear={true}
                            transitionAppearTimeout={1000}
                            transitionEnter={false}
                            transitionLeave={false}>
                            <img
                              key={index}
                              src={article.urlToImage}
                              onError={(event) => {
                                  event.target.src="https://via.placeholder.com/350x150" }} />
                          </ReactTransition>
                        </LazyLoad>
                      </div>
                      </a>
                    </li>)}
            </ul>
            <button className="siteBtn" onClick={() => this.getMoreNews('next')}>
              See More
            </button>
          </section>


          </section>
      );
  }
}

function CountrySelector(props){

  const isoCodes = require('../../../countries.json');

  const countryOpts = isoCodes.map((country, index) =>{
    return <option key={index} value={country.code} >{country.name}</option>;
  });
    return (
      <span>
        <select className='countrySelector'
          defaultValue={props.country} onChange={props.toggleCountry} >
          {countryOpts}
        </select>
      </span>
    );

}

export default Home;
