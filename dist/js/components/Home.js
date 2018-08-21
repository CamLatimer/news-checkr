import React from "react";

class Home extends React.Component {
  constructor(props) {
  super(props);
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
                <li  className="article countryArticle" key={index} >
                  <a href={article.url} target="_blank">
                <header>
                  <h3>{article.title}</h3>
                  <h5>({article.source.name})</h5>
                  <p>
                    {article.description}
                  </p>
                </header>
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
                        <img src={article.urlToImage} onError={(event) => { event.target.src="https://via.placeholder.com/350x150"
                      }} />
                      </div>
                      </a>
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
