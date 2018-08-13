import React from "react";
import { NavLink } from 'react-router-dom';

export default function Header(props, {match}){

      return (
        <div>
            <header>
              <h1>NEWS CHECKR</h1>
              <nav>
                <ul>
                  <li><NavLink exact to="/">Home</NavLink></li>
                  <li><NavLink onClick={() => props.getTopicNews('technology')} exact to="/topic/technology">TECHNOLOGY</NavLink></li>
                  <li><NavLink onClick={() => props.getTopicNews('science')} exact to="/topic/science">SCIENCE</NavLink></li>
                  <li><NavLink onClick={() => props.getTopicNews('sports')} exact to="/topic/sports">SPORTS</NavLink></li>
                  <li><NavLink onClick={() => props.getTopicNews('sports')} exact to="/topic/entertainment">ENTERTAINMENT</NavLink></li>
                  <li><NavLink onClick={() => props.getTopicNews('health')} exact to="/topic/health">HEALTH</NavLink></li>
                  <li><NavLink onClick={() => props.getTopicNews('business')} exact to="/topic/business">BUSINESS</NavLink></li>
                  <li><NavLink onClick={() => props.getTopicNews('politics')} exact to="/topic/politics">POLITICS</NavLink></li>
                </ul>
                </nav>
              </header>
            </div>
          );
}
