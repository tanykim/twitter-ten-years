import React, { Component } from 'react'
import _ from 'lodash'
import SelectFriend from './SelectFriend'
import Graph from './Graph'
import Stats from './Stats'
import Friend from './Friend'
import Histogram from './Histogram'

class FlowWrapper extends Component {

  componentWillMount() {
    this.props.onMountFunc()
  }

  render () {
    const { isFetching, data, selectedFriend } = this.props;
    return (<div>
      { isFetching && <h1> Loading ... </h1> }
      { !isFetching && data &&
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <SelectFriend {...data} selectFriend={this.props.selectFriend} />
        </div>
        <div className="col-xs-12">
          <Graph {...data} range={this.props.range} friend={selectedFriend} selectFriend={this.props.selectFriend}/>
          <Stats {...data} friend={selectedFriend} />
        </div>
        <div className="col-xs-12">
          {!_.isEmpty(selectedFriend) && <Friend friend={selectedFriend} mentions={data.mentions} /> }
        </div>
        <div className="col-xs-12 col-lg-6">
          <div> Number of sent mentions </div>
          <Histogram {...data} type="count" friend={selectedFriend}/>
        </div>
        <div className="col-xs-12 col-lg-6">
          <div> Duration of communication (Days) </div>
          <Histogram {...data} type="duration" friend={selectedFriend}/>
        </div>
      </div> }
    </div>)
  }
}

export default FlowWrapper