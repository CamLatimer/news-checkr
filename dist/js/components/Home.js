import React from "react";

class Home extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
  }
}

componentDidMount(){
  if(this.props.searching === true){
    this.props.history.push('/results')
  }
  if((this.props.countryNews.length === 0) && (this.props.worldNews.length === 0)){
    this.props.getCountryNews();
    this.props.getWorldNews();
  }
}

componentDidUpdate(){
  if((this.props.countryNews.length === 0) && (this.props.worldNews.length === 0)){
    this.props.getCountryNews();
    this.props.getWorldNews();
  }
}

  render() {
      return (
        <section className='homeNews newsWrapper'>

          <section className="countryNews">
            <header className="newsHeader countryNewsHeader">
              <h1>
                TOP HEADLINES for
                <CountrySelector  country={this.props.country} toggleCountry={this.props.toggleCountry} />
              </h1>
            </header>

            <ul className="articleGrid articleGrid--country">
            {this.props.countryNewsLoaded === true &&
              this.props.countryNews.map((article, index) =>
              <li key={index} className="article countryArticle">
                <header>
                  <h3><a href={article.url}>{article.title}</a></h3>
                  <h5><a href={article.url}>({article.source.name})</a></h5>
                  <summary>
                    {article.description}
                  </summary>
                </header>
                  <a href={article.url}>
                    <img src={article.urlToImage} onError={(event) => { event.target.src="https://via.placeholder.com/350x150"
                  }} />
                  </a>
              </li>)}
            </ul>
          </section>

          <section className="worldNews">
            <header className="newsHeader">
              <h1>TOP HEADLINES WORLDWIDE</h1>
            </header>
            <ul className="articleGrid">
              {this.props.worldNewsLoaded === true &&
                this.props.worldNews.map((article, index) =>
                    <li key={index} className="article articleGrid--small">
                      <header>
                        <h3><a href={article.url}>{article.title}</a></h3>
                        <h5><a href={article.url}>({article.source.name})</a></h5>
                        <summary>
                          {article.description}
                        </summary>
                      </header>
                      <div>
                        <img src={article.urlToImage} onError={(event) => { event.target.src="https://via.placeholder.com/350x150"
                      }} />
                      </div>
                    </li>)}
            </ul>
            <button className="siteBtn" onClick={() => this.props.getMoreNews('next')}>
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
