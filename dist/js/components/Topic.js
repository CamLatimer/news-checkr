import React from "react";
import axios from 'axios';
import LazyLoad from 'react-LazyLoad';
import ReactTransition from 'react-addons-css-transition-group';

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

  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      this.getTopicNews(this.props.match.params.topic)
    }
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
                    <LazyLoad
                      height={200}
                      offset={200}>
                      <ReactTransition
                        className="lazyLoadContainer"
                        transitionName="lazyImg"
                        transitionAppear={true}
                        transitionAppearTimeout={1000}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={500}>
                        { article.urlToImage !== null &&
                          <img
                            key={index}
                            src={article.urlToImage}
                            onError={(event) => {
                                event.target.src="https://via.placeholder.com/350x150" }} /> }
                        { article.urlToImage === null &&
                          <div className="placeHolderImg" alt="placeholder image">
                            <h1>{article.source.name}</h1>
                          </div> }
                      </ReactTransition>
                    </LazyLoad>
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
