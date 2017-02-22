import React, { Component } from 'react';
import Menu from './../components/Menu';
import { formatTime } from './../processors/formatter';

class Home extends Component {
  componentWillMount () {
    const timeRange = this.context.store.getState().timeRange;
    this.st = formatTime(timeRange[0], 'MMM D YYYY');
    this.et = formatTime(timeRange[1], 'MMM D YYYY');
  }
  render() {
    const menu = this.props.params.menu;
    return (
      <div className="row">
        <div className="col-xs-12">
          <h1> 10 Years with Twitter </h1>
          <div> {this.st} -  {this.et} </div>
          <Menu menu={menu}/>
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  store: React.PropTypes.object
}

export default Home