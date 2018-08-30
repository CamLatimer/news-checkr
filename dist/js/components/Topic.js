import React from "react";
import axios from 'axios';
import LazyImg from './LazyImg';

class Topic extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      topicNews: [],
      topicNewsLoaded: false
    }
    this.getTopicNews = this.getTopicNews.bind(this);
  }

  componentDidMount(){
    if(this.props.searching === true){
      this.props.history.push('/results');
    } else {
        if(this.state.topicNewsLoaded === false){
          this.getTopicNews(this.props.match.params.topic)
        }
    }
  }

  componentWillUnmount(){
    this.setState({
      topicNewsLoaded: false
    })
  }

  getTopicNews(topic){
    axios.get(`${process.env.HOSTDOMAIN}/category/${topic}`)
    .then((response) => {
      this.setState({
        topicNews: response.data.articles,
        topicNewsLoaded: true
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        topicNews: 'error'
      })
    })
  }


  render(){
    console.log(this.props.searching);
    if(this.props.topicNews === 'error'){
      return <h1>An error occurred... pleast try again...</h1>
    } else {
      return (
        <section className="topicNews newsWrapper">
            <header className="newsHeader">
              <h1>TOP {this.props.match.params.topic.toUpperCase()} HEADLINES </h1>
            </header>
            <ul>
              { this.state.topicNews.map((article, index) =>
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
