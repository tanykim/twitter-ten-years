import React, { Component } from 'react'

import { Link } from 'react-router'

class Menu extends Component {
  render () {
    const className = this.props.page === undefined ? 'home' : 'page';
    const menus = ['timeline', 'calendar', 'matrix', 'flow'].map((m) => (
        <Link to={m} key={m}>
          <span key={m}
          className={this.props.active? 'selected' : className}
          onClick={this.props.onClick}>{m}</span>
        </Link>
      ));
    return (
      <div className="menu">
        {menus}
      </div>
    );
  }
}
export default Menu
