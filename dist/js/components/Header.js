import React from "react";
import { NavLink, Link} from 'react-router-dom';

export default function Header(props){
  return (
      <header className="siteHeader">
        <i className="material-icons menuBtn" onClick={props.toggleMenu}>
          menu
        </i>
        <h1><Link to="/">NEWS CHECKR</Link></h1>
        <form onSubmit={props.searchNews}>
          <input onChange={props.getSearchInput} type="text" value={props.searchInput} placeholder="Search"></input>
          <button className="siteBtn">GO</button>
        </form>
      </header>
  );
}
