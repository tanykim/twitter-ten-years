import React, { Component } from 'react'
import _ from 'lodash'
import Bars from './Bars'
import TweetsWrapper from './TweetsWrapper'
// import TweetsStates from '../../containers/TweetsStates'

class TimelineWrapper extends Component {
  componentWillMount() {
    this.props.onMountFunc()
  }

  render () {
    const { isFetching, data } = this.props;

    return (<div>
      {isFetching && <h1> Loading... </h1> }
      {!isFetching && data && <div className="row">
        <div className="col-xs-12">
          <Bars {...this.props} />
        </div>
        <div className="col-xs-12">
          <TweetsWrapper {...this.props} />
        </div>
      </div>}
    </div>)
  }
}

export default TimelineWrapper
