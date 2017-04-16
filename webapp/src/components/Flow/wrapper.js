import React, { Component } from 'react'
import _ from 'lodash'
import Loading from '../common/Loading'
import Footer from '../Footer'
import SelectFriend from './SelectFriend'
import Graph from './Graph'
import Friend from './Friend'
import Network from './Network'
import ScatterPlot from './ScatterPlot'
import Histogram from './Histogram'
import { FriendTypes } from '../../helpers/formatter'

class FlowWrapper extends Component {

  componentWillMount() {
    this.props.onMountFunc()
  }

  render () {
    const { isFetching, data, selectedFriend, isHidden } = this.props;

    return (<div>
      { isFetching && <Loading /> }
      { !isFetching && data && <div>
        <div className="container-fluid page-top">
          <div className="desc friends">Explore @tanyofish's {data.mentions.length} Twitter friends.</div>
          <div className={isHidden ? 'fixed' : ''}>
            <div className="row friends-legend">
              <div className="legend-wrapper">
                { //legends
                  _.range(4).map((i) => (<span className="legend-type" key={i}>
                    <span className="type-wrapper">
                      <span className={`type type-${i}`}></span>
                      <span> {FriendTypes[i]}</span>
                    </span>
                  </span>)
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-lg-8 col-lg-push-4">
              { _.isEmpty(selectedFriend) ?
                <div className="friend-intro">Look into friends in four ways</div> :
                <Friend friend={selectedFriend} /> }
            </div>
            <div className="col-xs-12 col-lg-4 col-lg-pull-8">
              <div className="select-wrapper option">
                <div className="title"><span className="number">Option 1</span> Search by Twitter ID</div>
                <SelectFriend {...data} selectFriend={this.props.selectFriend} friend={selectedFriend} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <Graph {...data} range={this.props.range} friend={selectedFriend} selectFriend={this.props.selectFriend} />
            </div>
            <div className="col-xs-12 col-lg-6">
              <Network {...data} friend={selectedFriend} selectFriend={this.props.selectFriend} />
            </div>
            <div className="col-xs-12 col-lg-6">
              <ScatterPlot
                mentions={data.mentions}
                histogram={data.histogram}
                category={data.category}
                friend={selectedFriend}
                selectFriend={this.props.selectFriend}
              />
            </div>
          </div>
          <div className="row vis-bg histograms-wrapper">
            <div className="col-xs-12 col-lg-4">
              <Histogram
                ranking={data.ranking.count}
                data={data.histogram.count}
                type="count"
                friend={selectedFriend}
                label="Number of Mentions"
                unit="mentions"
              />
            </div>
            <div className="col-xs-12 col-lg-4">
              <Histogram
                ranking={data.ranking.duration}
                data={data.histogram.duration}
                type="duration"
                friend={selectedFriend}
                label="Days of Conversation"
                unit="days"
              />
            </div>
            <div className="col-xs-12 col-lg-4">
              <Histogram
                ranking={data.ranking.common}
                data={data.histogram.common}
                type="common"
                friend={selectedFriend}
                label="Number of Involved Friends in Conversation"
                unit="Involved Friends"
              />
            </div>
          </div>
        </div>
      </div>}

      <div className="container-fluid">
        <Footer/>
      </div>
    </div>)
  }
}

export default FlowWrapper