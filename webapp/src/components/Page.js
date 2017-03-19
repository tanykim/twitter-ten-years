import React, { Component } from 'react'
import Footer from './Footer'
import TimelineWrapper from '../components/Timeline/wrapper'
import FlowWrapper from '../components/Flow/wrapper'

class Page extends Component {

  componentWillMount() {
    this.props.onMountFunc(this.props.page)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.page && this.props.page !== nextProps.page ) {
      this.props.onMountFunc(nextProps.page)
    }
  }

  render() {
    const { isFetching, dataByPage, page, range } = this.props;
    const data = dataByPage[page]
    return (
      <div>
        <h1>{ page }</h1>
        { isFetching && <h2> Loading... </h2> }
        { data && page === 'timeline' && <TimelineWrapper {...data} range={range}/> }
        { data && page === 'flow' && <FlowWrapper {...data} range={range}/> }
        <Footer/>
      </div>
    );
  }
}

export default Page;

