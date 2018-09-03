import React from "react";
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Topic from './Topic';
import SearchResults from './SearchResults';
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
      searchResults: [],
      searching: null,
    };
    this.searchNews = this.searchNews.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  searchNews(searchInput){
    axios.get(`${process.env.HOSTDOMAIN}/search?q=${searchInput}`)
    .then((response) => {
      this.setState({
        searchResults: response.data.articles,
        searching: true,
      })
    }).catch((err) => {
      console.log(err);
      this.setState({
        searching: true,
        searchResults: 'error'
      })
    })
  }

  clearSearch(){
    this.setState({
      searching: false
    })
  }

  render() {
    return (
        <BrowserRouter>
          <div>
              <Header
                searchNews={this.searchNews}
                getTopicNews={this.getTopicNews}
                clearSearch={this.clearSearch} />
              <Switch>
                <Route exact path="/"
                  component={(props) =>
                    <Home {...props} searching={this.state.searching} />
                } />
                <Route path="/topic/:topic"
                  component={(props) =>
                    <Topic {...props} searching={this.state.searching} />
                } />
                <Route exact path="/results"
                  component={(props) =>
                    <SearchResults
                    {...props}
                    searchNews={this.searchNews}
                    results={this.state.searchResults}
                    clearSearch={this.clearSearch}
                    searching={this.state.searching} />
                  } />
                <Route
                  component={() => <h1>Requested Info Not Found...</h1>}
                />
              </Switch>
            </div>
          </BrowserRouter>

    );
  }
}


export default App;
