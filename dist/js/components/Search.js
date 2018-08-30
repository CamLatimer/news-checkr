import React from 'react';

export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchInput: ''
    };

    this.getSearchInput = this.getSearchInput.bind(this);
    this.search = this.search.bind(this);
  }

  getSearchInput(event){
    this.setState({
      searchInput: event.target.value
    });
  }

  search(event){
    event.preventDefault();
    this.props.searchNews(this.state.searchInput);
    this.setState({
      searchInput: ''
    })
  }

  render(){
    return(<form onSubmit={this.search}>
      <input onChange={this.getSearchInput} type="text"  value={this.state.searchInput} placeholder="Search"></input>
      <button className="siteBtn">GO</button>
    </form>);
  }

}
