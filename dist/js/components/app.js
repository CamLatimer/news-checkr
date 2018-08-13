import React from "react";
import Header from './Header';
import Home from './Home';
import Topic from './Topic';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryNews: this.props.countryNews,
      worldNews: this.props.worldNews.articles,
      topicNews: [],
      country: 'us',
      worldPage: 1,
    }
    this.toggleCountry = this.toggleCountry.bind(this);
    this.getMoreNews = this.getMoreNews.bind(this);
    this.getTopicNews = this.getTopicNews.bind(this);
  }

  toggleCountry(event){
    let country = event.target.value;
    axios.get(`http://localhost:8080/country/${country}`)
    .then((response) => {
      this.setState({
        country: country,
        countryNews: response.data
      });
    })
  }

  getMoreNews(direction){
    let pageNum = direction === 'next' ? this.state.worldPage + 1 : this.state.worldPage - 1;
    axios.get(`http://localhost:8080/world/${pageNum}`)
    .then((response) => {
      this.setState({
        worldNews: response.data.articles,
        worldPage: pageNum
      });
    })
  }

  getTopicNews(topic){
    axios.get(`http://localhost:8080/category/${topic}`)
    .then((response) => {
      console.log(response.data.articles);
      this.setState({
        topicNews: response.data.articles,
      });
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header
              country={this.state.country}
              getTopicNews={this.getTopicNews}/>
              <Switch>
                <Route
                  exact path="/"
                  component={() =>
                    <Home
                    toggleCountry={this.toggleCountry}
                    country={this.state.country}
                    countryNews={this.state.countryNews}
                    worldNews={this.state.worldNews}
                    worldPage={this.state.worldPage}
                    getMoreNews={this.getMoreNews} />
                  } />
                <Route
                  path="/topic/:topic"
                  component={(props) =>
                    <Topic {...props}
                      getTopicNews={this.getTopicNews}
                      news={this.state.topicNews} />
                  } />
                <Route
                  component={() => <h1>Requested Info Not Found...</h1>} />
              </Switch>
            </div>
          </BrowserRouter>
      </div>

    );
  }
}

export default App;
