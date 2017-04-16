import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router'
import _ from 'lodash'
import Footer from './Footer'

class Home extends Component {

  constructor(props) {
    super();
    this.onMouseFunc = this.onMouseFunc.bind(this);
  }

  componentWillMount() {
    this.setState({tweets: false, friends: false});
  }

  onMouseFunc(menu, val) {
    this.setState({[menu]: val});
  }

  render() {
    const icons = {
      tweets: ['matrix', 'pie', 'bar'],
      friends: ['line', 'force', 'histogram']
    }
    const iconRender = _.map(icons, (vals, key) => vals.map((c, i) =>
      <div key={c}
        className="icon"
        onMouseOver={() => this.onMouseFunc(key, true)}
        onMouseOut={() => this.onMouseFunc(key, false)}
        onClick={() => browserHistory.push('/' + key)}
        style={{ background:
          `url(/assets/images/${c}${this.state[key] ? '-c' : ''}.svg) no-repeat center center` }}>
        { ((key === 'friends' && i > 0) || (key === 'tweets' && i < 2)) &&
          <span span className={c}>x</span> }
            </div>
    ));

    return (<div>
      <div className="container">
        <div className="row logo-wrapper">
          <div className="col-lg-4 hidden-xs hidden-sm hidden-md wing-wrapper left">
            <div
              className="menu-name left"
              onMouseOver={() => this.onMouseFunc('tweets', true)}
              onMouseOut={() => this.onMouseFunc('tweets', false)}>
              <Link to="/tweets">= TWEETS</Link>
            </div>
            {
              iconRender[0]
            }
          </div>
          <div className="col-lg-4 col-xs-12 logo" />
          <div className="col-lg-4 hidden-xs hidden-sm hidden-md wing-wrapper right">
            <div
              className="menu-name right"
              onMouseOver={() => this.onMouseFunc('friends', true)}
              onMouseOut={() => this.onMouseFunc('friends', false)}>
              <Link to="/friends">FRIENDS = </Link>
            </div>
            { iconRender[1] }
          </div>
        </div>
        <div className="row home-content-wrapper">
          <div className="col-lg-6 col-sm-12 col-lg-offset-3 hidden-xs hidden-sm hidden-md main">
            <div className="border">
              Data Visualization of <a href="https://www.twitter.com/tanyofish" target="_blank">@tanyofish</a>'s <br/>
              <Link to="/tweets">Tweets</Link> and <Link to="/friends">Friends</Link> since April 2007
            </div>
          </div>
          <div className="col-xs-12 col-md-8 col-md-offset-2 hidden-lg main">
            <div className="border">
              Data Visualization of <a href="https://www.twitter.com/tanyofish" target="_blank">@tanyofish</a>'s Twitter since April 2007
              <div className="col-xs-12 col-sm-6 sm-icon-wrapper">
                <Link to="/tweets">Tweets</Link>
                <div className="left">{ iconRender[0] }</div>
              </div>
              <div className="col-xs-12 col-sm-6 sm-icon-wrapper">
                <Link to="/friends">Friends</Link>
                <div className="right">{ iconRender[1] }</div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 powered">
            Powered by Twitter API & downloaded Twitter archives. <br/>
            Not affiliated or endorsed by Twitter.
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </div>);
  }
}

export default Home