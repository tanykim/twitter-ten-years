import React, { Component } from 'react'
import Menu from '../containers/Menu'
import TimelineStates from '../containers/Timeline'
import FlowStates from '../containers/Flow'

class Page extends Component {

  componentDidMount() {
    window.addEventListener('scroll', this.props.handScroll);
  }

  render() {
    const page = this.props.page;
    return (
      <div>
        <Menu />
        <div className="content" id="content">
          { page === 'tweets' && <TimelineStates /> }
          { page === 'friends' && <FlowStates /> }
        </div>
      </div>
    );
  }
}

export default Page;

