import React, { Component } from 'react'
import Footer from './Footer'
import TimelineStates from '../containers/Timeline'
import FlowStates from '../containers/Flow'

class Page extends Component {

  // componentWillMount() {
  //   this.props.onMountFunc(this.props.page)
  // }

  // componentWillUpdate(nextProps) {
  //   if (nextProps.page && this.props.page !== nextProps.page ) {
  //     this.props.onMountFunc(nextProps.page)
  //   }
  // }

  render() {
    // const { isFetching, dataByPage, page, range } = this.props;
    // const data = dataByPage[page]
    const page = this.props.params.page
    return (
      <div>
        <h1>{ page }</h1>
        {
          // isFetching && <h2> Loading... </h2>
        }
        { page === 'timeline' && <TimelineStates /> }
        { page === 'flow' && <FlowStates /> }
        <Footer/>
      </div>
    );
  }
}

export default Page;

