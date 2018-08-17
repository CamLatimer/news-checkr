import React from "react";
import Article from './Article';
import { Redirect } from 'react-router-dom';

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

    if(this.props.countryNews === 'error'){
      return <h1>An error occurred... pleast try again...</h1>
    } else {
      return (
        <div>
          <section>
            <header>
              <h1>TOP HEADLINES for <CountrySelector country={this.props.country} toggleCountry={this.props.toggleCountry} /></h1>

            </header>
            {this.props.countryNewsLoaded === true &&
              this.props.countryNews.map((article, index) =>
                  <Article key={index} headline={article.title} description={article.description} sourceUrl={article.url} source={article.source} imgUrl={article.urlToImage} publishedAt={article.publishedAt} /> )}
          </section>
          <header>
            <h1>TOP HEADLINES WORLDWIDE</h1>
          </header>
            <section>
              {this.props.worldNewsLoaded === true &&
                this.props.worldNews.map((article, index) =>
                    <Article key={index} headline={article.title} description={article.description} sourceUrl={article.url} source={article.source} imgUrl={article.urlToImage} publishedAt={article.publishedAt} /> )}
            <button onClick={() => this.props.getMoreNews('next')}>See More</button>
            </section>
          </div>
      );
    }
  }
}

function CountrySelector(props){

  const isoCodes = require('../../../countries.json');

  const countryOpts = isoCodes.map((country, index) =>{
    return <option key={index} value={country.code} >{country.name}</option>;
  });
    return (
      <div>
        <select
          defaultValue={props.country} onChange={props.toggleCountry} >
          {countryOpts}
        </select>
      </div>
    );

}

export default Home;
