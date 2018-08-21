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
      country: 'us',
      countryNews: [],
      worldNews: [],
      countryNewsLoaded: false,
      worldNewsLoaded: false,
      worldPage: 1,
      topicNews: [],
      searchInput: '',
      searchResults: [],
      searching: null,
      menuOpen: false
    };

    this.searchNews = this.searchNews.bind(this);
    this.getSearchInput = this.getSearchInput.bind(this);
    this.getTopicNews = this.getTopicNews.bind(this);
    this.toggleCountry = this.toggleCountry.bind(this);
    this.getMoreNews = this.getMoreNews.bind(this);
    this.getCountryNews = this.getCountryNews.bind(this);
    this.getWorldNews = this.getWorldNews.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }


  getTopicNews(topic){
    axios.get(`${process.env.HOSTDOMAIN}/category/${topic}`)
    .then((response) => {
      this.setState({
        topicNews: response.data.articles,
        countryNews: [],
        worldNews: []
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        topicNews: 'error'
      })
    })
  }

  getSearchInput(event){
    this.setState({
      searchInput: event.target.value
    });
  }

  searchNews(event){
    event.preventDefault();
    axios.get(`${process.env.HOSTDOMAIN}/search?q=${this.state.searchInput}`)
    .then((response) => {
      this.setState({
        searchResults: response.data.articles,
        searching: true,
        searchInput: ''
      })
    }).catch((err) => {
      console.log(err);
      this.setState({
        searching: true,
        searchInput: '',
        searchResults: 'error'
      })
    })
  }

  clearSearch(){
    this.setState({
      searching: false
    })
  }

  toggleCountry(event){
    let country = event.target.value;
    axios.get(`${process.env.HOSTDOMAIN}/country/${country}`)
    .then((response) => {
      this.setState({
        country: country,
        countryNews: response.data.articles
      })
    }).catch((err) => {
        console.log(err);
        this.setState({
          searchResults: 'error'
        })
      });
  }

  getCountryNews(){
    axios.get(`${process.env.HOSTDOMAIN}/country/${this.state.country}`)
    .then((response) => {
      this.setState({
        countryNews: response.data.articles,
        countryNewsLoaded: true
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  getWorldNews(){
    axios.get(`${process.env.HOSTDOMAIN}/world`)
    .then((response) => {
      this.setState({
        worldNews: response.data.articles,
        worldNewsLoaded: true

      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        worldNews: 'error'
      })
    })
  }

  getMoreNews(direction){
    let pageNum = direction === 'next' ? this.state.worldPage + 1 : this.state.worldPage - 1;
    let totalWorld = this.state.worldNews;
    axios.get(`${process.env.HOSTDOMAIN}/world/${pageNum}`)
    .then((response) => {
      this.setState({
        worldNews: totalWorld.concat(response.data.articles),
        worldPage: pageNum
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        searchResults: 'error'
      })
    })
  }

  toggleMenu(){
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  componentDidMount(){
    window.addEventListener('resize', () => {
      this.setState({
        menuOpen: false
      })
    })
  }

  render() {
    return (
        <BrowserRouter>
          <div>
              <Header
                getSearchInput={this.getSearchInput}
                searchInput={this.state.searchInput}
                searchNews={this.searchNews}
                toggleMenu={this.toggleMenu} />
              <Nav
                getTopicNews={this.getTopicNews}
                clearSearch={this.clearSearch}
                menuOpen={this.state.menuOpen}
                toggleMenu={this.toggleMenu}  />

              <Switch>
                <Route exact path="/"
                  component={(props) =>
                    <Home {...props}
                      country={this.state.country}
                      countryNewsLoaded={this.state.countryNewsLoaded}
                      worldNewsLoaded={this.state.worldNewsLoaded}
                      countryNews={this.state.countryNews}
                      worldNews={this.state.worldNews}
                      getMoreNews={this.getMoreNews}
                      toggleCountry={this.toggleCountry}
                      searching={this.state.searching}
                      getCountryNews={this.getCountryNews}
                      getWorldNews={this.getWorldNews}
                   /> }
                 />
                <Route path="/topic/:topic"
                  component={(props) =>
                    <Topic
                      {...props}
                      getTopicNews={this.getTopicNews}
                      topicNews={this.state.topicNews}
                      searching={this.state.searching} />
                    } />
                <Route exact path="/results"
                  component={(props) =>
                    <SearchResults
                    {...props}
                    searchInput={this.state.searchInput}
                    searchNews={this.searchNews}
                    results={this.state.searchResults}
                    clearSearch={this.clearSearch}
                    searching={this.state.searching}
                    error={this.state.error}/>
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
