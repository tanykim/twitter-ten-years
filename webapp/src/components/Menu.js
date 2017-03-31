import React, { Component } from 'react'
import { Link } from 'react-router'

class Menu extends Component {
  render () {
    return (
      <div className="container-fluid menu-header">
        <div className="border">
          <Link to="/tweets" activeClassName="active"><span className="tweets">Tweets</span></Link>
          <Link to="/"><span className="home">@tanyofish's 10 Years of Twitter</span></Link>
          <Link to="/friends" activeClassName="active"><span className="friends">Friends</span></Link>
        </div>
      </div>
    );
  }
}

export default Menu