import React, { Component } from 'react'
import { Link } from 'react-router'

class Menu extends Component {
  render () {
    const menus = ['timeline', 'calendar', 'matrix', 'flow'].map((m) => (
        <Link to={m} key={m}>
          <span className={this.props.page === m ? 'selected' : 'normal'}>{m}</span>
        </Link>
      ));
    return (
      <div className={this.props.page ? 'menu-header' : 'menu-home'}>
        {menus}
      </div>
    );
  }
}

export default Menu
