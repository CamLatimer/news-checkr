import React from "react";
import Nav from './Nav';
import Search from './Search';
import { NavLink, Link} from 'react-router-dom';

export default class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      menuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.keepMenuClosed = this.keepMenuClosed.bind(this);
  }

  toggleMenu(){
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  keepMenuClosed(mediaQuery){
      if(this.state.menuOpen === true){
        this.setState({
          menuOpen: false
        })
      }
  }

  componentDidMount(){
    const mql = window.matchMedia('(min-width: 768px)');
    mql.addListener(this.keepMenuClosed);
    this.keepMenuClosed(mql);
  }

  render(){
    return (
        <header className="siteHeader">
          <div className="siteHeaderRow" >
            <i className="material-icons menuBtn" onClick={this.toggleMenu}>menu</i>
            <h1>
              <Link to="/">NEWS CHECKR</Link>
            </h1>
            <Search searchNews={this.props.searchNews}/>
          </div>
            <Nav
              getTopicNews={this.props.getTopicNews}
              clearSearch={this.props.clearSearch}
              menuOpen={this.state.menuOpen}
              toggleMenu={this.toggleMenu} />
        </header>
    );
  }
}
