import React, { Component } from 'react'
import { Link } from 'react-router'

class Menu extends Component {
  render () {
    return (<div>
      { !this.props.isHidden ? <div className="container-fluid menu-header">
        <div className="border">
          <Link to="/tweets" activeClassName="active"><span className="tweets">TWEETS</span></Link>
          <span className="heart"></span>
          <Link to="/"><span className="home">@tanyofish's 10 Years of Twitter</span></Link>
          <span className="heart"></span>
          <Link to="/friends" activeClassName="active"><span className="friends">FRIENDS</span></Link>
        </div>
      </div> : <div className="container">
        <div className="row menu-header-min">
          <div className="col-xs-4 col-lg-1 ribbon">
            <ul className="links-wrapper">
              <li><Link to="/"><span className="heart"></span></Link></li>
              <li className="tweets"><Link to="/tweets" activeClassName="active"><span className="tweets">Tweets</span></Link></li>
              <li className="friends"><Link to="/friends" activeClassName="active"><span className="friends">Friends</span></Link></li>
            </ul>
          </div>
        </div>
      </div>}
    </div>);
  }
}

export default Menu