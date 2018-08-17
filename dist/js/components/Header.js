import React from "react";
import { NavLink, Link} from 'react-router-dom';

export default function Header(props){
  function switchTopic(event){
    props.clearSearch();
    props.getTopicNews(event.target.textContent.toLowerCase())
  }


  return (
    <div>
      <header>
        <h1>NEWS CHECKR</h1>
        <nav>
          <ul>
            <li>
              <NavLink onClick={props.clearSearch} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact onClick={switchTopic}  to="/topic/technology">
                TECHNOLOGY
              </NavLink>
            </li>
            <li>
              <NavLink onClick={switchTopic} to="/topic/science">
                SCIENCE
              </NavLink>
            </li>
            <li>
              <NavLink onClick={switchTopic} to="/topic/sports">
                SPORTS
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={switchTopic} to="/topic/entertainment">
                ENTERTAINMENT
              </NavLink>
            </li>
            <li>
              <NavLink onClick={switchTopic} to="/topic/health">
                HEALTH
              </NavLink>
            </li>
            <li>
              <NavLink onClick={switchTopic} to="/topic/business">
                BUSINESS
              </NavLink>
            </li>
            <li>
              <NavLink onClick={switchTopic} to="/topic/politics">
                POLITICS
              </NavLink>
            </li>
          </ul>
        </nav>
        <form onSubmit={props.searchNews}>
          <input onChange={props.getSearchInput} type="search" value={props.searchInput} placeholder="Search"></input>
          <button>GO</button>
        </form>
      </header>
    </div>
  );
}
