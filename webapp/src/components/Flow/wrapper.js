import React, { Component } from 'react'
import _ from 'lodash'
import Loading from '../common/Loading'
import Footer from '../Footer'
import SelectFriend from './SelectFriend'
import Graph from './Graph'
import Friend from './Friend'
import Network from './Network'
import ScatterPlot from './ScatterPlot'
import { FriendTypes } from '../../helpers/formatter'

class FlowWrapper extends Component {

  componentWillMount() {
    this.props.onMountFunc()
  }

  render () {
    const { isFetching, data, selectedFriend } = this.props;

    return (<div>

      { isFetching && <Loading /> }

      { !isFetching && data && <div>
        <div className="container-fluid page-top">
          <div className="desc">Explore what @tanyofish has been doing with {data.mentions.length} Twitter friends.</div>
          <div className={this.props.isHidden ? 'fixed' : ''}>
            <div className="row friends-top">
            </div>
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
            <div className="col-xs-12 col-lg-4">
              { !_.isEmpty(selectedFriend) &&
                <Friend
                  friend={selectedFriend}
                /> }
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-lg-4">
              <div className="select-wrapper option">
                <div className="title"><span className="number">Option 1</span> Search by Twitter ID</div>
                <SelectFriend {...data} selectFriend={this.props.selectFriend} friend={selectedFriend} />
              </div>
            </div>
            <div className="col-xs-12 col-lg-8">
              Look into friends in four ways
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
              <ScatterPlot {...data} friend={selectedFriend} selectFriend={this.props.selectFriend}/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>}
    </div>)
  }
}

export default FlowWrapper

            // <div className="col-xs-12 col-lg-6">
            //   <Histogram {...data} type="count" friend={selectedFriend}/>
            // </div>
            // <div className="col-xs-12 col-lg-6">
            //   <Histogram {...data} type="duration" friend={selectedFriend}/>
            // </div>
