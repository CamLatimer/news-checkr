import React from "react";
import Article from './Article';
import axios from 'axios';
import { Route, NavLink, Redirect } from 'react-router-dom';

class Topic extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if(this.props.news.length === 0){
      this.props.getTopicNews(this.props.match.params.topic);
    }
  }
  render() {
    let articles = this.props.news.map((article, index) => {
      return (
        <Article key={index} headline={article.title} description={article.description} sourceUrl={article.url} source={article.source} imgUrl={article.urlToImage} publishedAt={article.publishedAt} />
      );
    })
    return (
      <div>
          <header>
            <h1>TOP {this.props.match.params.topic.toUpperCase()} HEADLINES </h1>
          </header>
          <section>
            {articles}
          </section>
        </div>
    );
  }
}

export default Topic;
