import React from "react";
import Article from './Article';

class Home extends React.Component {
  constructor(props) {
  super(props);
}
  render() {
    let countryNews = this.props.countryNews.filter((obj) => {
      if(obj.category === 'general'){
        return obj
      };
    });
    let worldArticles = this.props.worldNews.map((article, index) => {
      return (
        <Article key={index} headline={article.title} description={article.description} sourceUrl={article.url} source={article.source} imgUrl={article.urlToImage} publishedAt={article.publishedAt} />
      );
    })
    let countryArticles = countryNews[0].articles.map((article, index) => {
      return (
        <Article key={index} headline={article.title} description={article.description} sourceUrl={article.url} source={article.source} imgUrl={article.urlToImage} publishedAt={article.publishedAt} />
      );
    });
    return (
      <div>
        <section>
          <header>
            <h1>TOP HEADLINES for <CountrySelector country={this.props.country} toggleCountry={this.props.toggleCountry} /></h1>

          </header>
          {countryArticles}
        </section>
        <header>
          <h1>TOP HEADLINES WORLDWIDE</h1>
        </header>
          <section>
          {worldArticles}
          {this.props.worldPage > 1 &&
          <button onClick={() => this.props.getMoreNews('prev')}>Prev</button>
          }
          <button onClick={() => this.props.getMoreNews('next')}>Next</button>
          </section>
        </div>
    );
  }
}

function CountrySelector(props){
  
  const isoCodes = require('../../../countries.json');

  const countryOpts = isoCodes.map((country, index) =>{
    return <option key={index} value={country.code}>{country.name}</option>;
  });
    return (
      <div>
        <select
          value={props.country} onChange={props.toggleCountry}>
          {countryOpts}
        </select>
      </div>
    );

}

export default Home;
