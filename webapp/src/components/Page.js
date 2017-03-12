import React, { Component } from 'react'
import Footer from './Footer'
import FlowStates from '../containers/FlowStates'

class Page extends Component {
  render() {
    const page = this.props.params.page;
    console.log('--------page', page)
    return (
      <div>
        <h1>{ page }</h1>
        { page === 'flow' && <FlowStates /> }
        <Footer />
      </div>
    );
  }
}

export default Page;

