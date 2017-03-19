import React, { Component } from 'react'
import _ from 'lodash'
import Bars from './Bars'
import TweetsStates from '../../containers/TweetsStates'

class TimelineWrapper extends Component {
  render () {
    return (
      <div className="row">
        <div className="col-xs-12">
          <Bars data={this.props.byMonth} range={this.props.range} />
        </div>
        <div className="col-xs-12">
            <TweetsStates />
        </div>
      </div>
    )
  }
}

export default TimelineWrapper
