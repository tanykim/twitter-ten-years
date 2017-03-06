import React, { Component } from 'react'
import { Link } from 'react-router'

class Menu extends Component {
  render () {
    const menus = ['timeline', 'calendar', 'matrix', 'flow'].map((m) => (
        <Link to={m} key={m} activeClassName="active"><span>{m}</span></Link>
      ));
    return (
      <div className="menu-header">
        <Link to="/"><span>Home</span></Link>
        {menus}
      </div>
    );
  }
}

export default Menu