import React from "react";
import { NavLink, Link} from 'react-router-dom';

export default function Nav(props){
  function switchTopic(event){
    props.clearSearch();
    props.toggleMenu();
  }


  return (
    <nav className={props.menuOpen === true ? 'slideOpen' : ''}>
      <ul>
        <i className="material-icons menuCloser" onClick={props.toggleMenu}>
          cancel
        </i>
          <li>
            <NavLink onClick={props.clearSearch, props.toggleMenu} to="/">
              HOME
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
  );
}
