import React, { Component } from 'react';
import { Link } from 'react-router'
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
    return (
      <div className="container">
        <div className="row logo-wrapper">
          <div className="col-lg-4 wing-wrapper left">
            <div
              className="menu-name left"
              onMouseOver={() => this.onMouseFunc('tweets', true)}
              onMouseOut={() => this.onMouseFunc('tweets', false)}>
              <Link to="/tweets">= TWEETS</Link>
            </div>
            {
              ['matrix', 'pie', 'bar'].map((c, i) =>
                  <div key={c}
                    className="icon"
                    // className={`icon ${this.state.tweets ? 'hover' : 'normal'}`}
                    style={{ background:
                      `url(/assets/images/${c}${this.state.tweets ? '-c' : ''}.svg) no-repeat center center` }}>
                    { i < 2 && <span className={c}>x</span> }
                  </div>
                )
            }
          </div>
          <div className="col-lg-4 logo" />
          <div className="col-lg-4 wing-wrapper right">
            <div
              className="menu-name right"
              onMouseOver={() => this.onMouseFunc('friends', true)}
              onMouseOut={() => this.onMouseFunc('friends', false)}
            >
              <Link to="/friends">FRIENDS = </Link>
            </div>
            {
              ['line', 'force', 'histogram'].map((c, i) =>
                  <div key={c}
                    className="icon"
                    // className={`icon ${this.state.friends ? 'hover' : 'normal'}`}
                    style={{ background:
                      `url(/assets/images/${c}${this.state.friends ? '-c' : ''}.svg) no-repeat center center` }}>
                    { i > 0 && <span span className={c}>x</span> }
                  </div>
                )
            }
          </div>
        </div>
        <div className="row home-content-wrapper">
          <div className="col-lg-6 col-lg-offset-3 main">
            <div className="border">
              Data Visualization of <a href="https://www.twitter.com/tanyofish" target="_blank">@tanyofish</a>'s <br/>
              <Link to="/tweets">Tweets</Link> and <Link to="friends">Friends</Link> since April 2007
            </div>
          </div>
          <div className="col-lg-6 col-lg-offset-3 powered">
            Powered by Twitter API & downloaded Twitter archives. <br/>
            Not affiliated or endorsed by Twitter.
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home