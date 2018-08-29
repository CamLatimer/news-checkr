import React from "react";
import { Redirect } from 'react-router-dom';
import LazyImg from './LazyImg';

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
        <section className="topicNews newsWrapper">
            <header className="newsHeader">
              <h1>TOP {this.props.match.params.topic.toUpperCase()} HEADLINES </h1>
            </header>
            <ul>
              {this.props.topicNews.map((article, index) =>
                <li key={index} className={index > 0 ? `article articleGrid--small` : `article`}>
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
export default Topic;
