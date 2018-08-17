import React from "react";
import Article from './Article';
import { Redirect } from 'react-router-dom';

class Topic extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    if(this.props.searching === true){
      this.props.history.push('/results');
    } else {
        if(this.props.topicNews.length === 0){
          this.props.getTopicNews(this.props.match.params.topic)
        }
    }
  }

  componentDidUpdate(){
      this.props.getTopicNews(this.props.match.params.topic)
  }

  render(){
    if(this.props.topicNews === 'error'){
      return <h1>An error occurred... pleast try again...</h1>
    } else {
      return (
        <div>
            <header>
              <h1>TOP {this.props.match.params.topic.toUpperCase()} HEADLINES </h1>
            </header>
            <section>
              {this.props.topicNews.map((article, index) =>
                <Article key={index} headline={article.title} description={article.description} sourceUrl={article.url} source={article.source} imgUrl={article.urlToImage} publishedAt={article.publishedAt} />
              )}
            </section>
        </div>
      );
    }
  }
}
export default Topic;
