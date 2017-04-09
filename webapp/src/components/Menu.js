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
      </div> : <div className="container-fluid">
        <div className="row menu-header-min">
          <div className="ribbon">
            <div className="links-wrapper">
              <Link to="/"><span className="home" dangerouslySetInnerHTML={{__html: '&#x2190'}}/></Link>
              <Link to="/tweets" activeClassName="active"><span className="tweets">Tweets</span></Link>
              <span className="heart"></span>
              <Link to="/friends" activeClassName="active"><span className="friends">Friends</span></Link>
            </div>
          </div>
        </div>
      </div>}
    </div>);
  }
}

export default Menu