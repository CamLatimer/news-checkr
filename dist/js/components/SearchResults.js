import React from "react";
import Article from './Article';

export default class SearchResults extends React.Component {
  constructor(props){
    super(props);
  }


  componentDidMount(){
    if(this.props.searching === true){
      this.props.clearSearch();
    }
  }

  render(){
      if(this.props.results === 'error'){
        return (
        <div>
          <h1>An error occured, or nothing was returned from your search.</h1> <h1>Please start a new search or go back...</h1>
        </div>
        );
      } else {
        return (
          <div>
              <header>
                <h3>Results:</h3>
              </header>
              <section>
                {this.props.results.map((article, index) =>
                    <Article key={index} headline={article.title} description={article.description} sourceUrl={article.url} source={article.source} imgUrl={article.urlToImage} publishedAt={article.publishedAt} />
                  )}
              </section>
            </div>
        );
      }
  }


}
