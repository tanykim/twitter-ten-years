import React, { Component } from 'react'
import Menu from '../components/Menu'
import Footer from './Footer'
import TimelineStates from '../containers/Timeline'
import FlowStates from '../containers/Flow'

class Page extends Component {
  render() {
    const page = this.props.params.page
    return (
      <div>
        <Menu />
        <div className="content">
          { page === 'tweets' && <TimelineStates /> }
          { page === 'friends' && <FlowStates /> }
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Page;

