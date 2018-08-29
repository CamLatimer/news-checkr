import React from "react";
import LazyImg from './LazyImg';

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
          <h1>An error occured, or nothing was returned from your search.</h1>
          <h1>Please start a new search or go back...</h1>
        </div>
        );
      } else if (!this.props.results.length){
        return <h1>Please start a new search or go back...</h1>
      } else {
        return (
          <section className="searchResults newsWrapper">
              <header>
                <h3>Top Headlines from Search:</h3>
              </header>
                <ul>
                {this.props.results.map((article, index) =>
                  <li key={index} className="article articleGrid--small">
                    <header>
                      <h3><a href={article.url} target="_blank">{article.title}</a></h3>
                      <h5><a href={article.url} target="_blank">({article.source.name})</a></h5>
                      <summary>
                        {article.description}
                      </summary>
                    </header>
                    <div>
                      <LazyImg src={article.urlToImage} />
                    </div>
                  </li>
                  )}
                </ul>
            </section>
        );
      }
  }


}
