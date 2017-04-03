import React, { Component } from 'react'
import _ from 'lodash'
import Matrix from './Matrix'
import Pie from './Pie'
import { getRangeText } from '../../helpers/formatter'
import Bars from './Bars'

class TweetsWrapper extends Component {

  constructor(props) {
    super();
    this.onRangeSelected = this.onRangeSelected.bind(this);
  }

  componentWillMount () {
    this.props.getTweets(this.props.selectedRange);
  }

  onRangeSelected(range, count) {
    this.props.getTweets(range);
  }

  render () {
    const { isFetchingTweets, tweets, selectedRange, category, matrix, changeCategory } = this.props
    return (<div>
      <div className="row">
        <div className="col-xs-12 summary">
          { isFetchingTweets ?
            <div> Analyzing data... </div> :
            <div>
              <strong>{tweets.total && tweets.total.toLocaleString()} Tweets</strong>
              {` `}<span dangerouslySetInnerHTML={{__html:getRangeText(selectedRange)}} />
            </div> }
        </div>
      </div>

      <Bars
        range={this.props.range}
        selectedRange={this.props.selectedRange}
        {...this.props.data}
        category={category}
        selectRange={this.onRangeSelected}
        isFetchingTweets={isFetchingTweets}
      />

      { !isFetchingTweets && tweets.total > 0 && category !== 'none' &&
        <div className="row vis-bg all-pies-wrapper">
          {tweets.byType.map((value, i) =>
            <div className={`col-lg-3 ${category === value[0] ? 'category-selected' : ''}`} key={i}>
              <Pie
                label={value[0]} data={value[1]} total={tweets.total}
                category={category}
                changeCategory={changeCategory} />
            </div>
          )}
        </div> }

      { !isFetchingTweets && tweets.total > 0 && <Matrix
          {...tweets}
          category={category}
          matrix={matrix}
          changeMatrixView={this.props.changeMatrixView}
        /> }
    </div>)
  }
}

export default TweetsWrapper