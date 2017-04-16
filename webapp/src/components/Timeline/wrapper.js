import React, { Component } from 'react'
import _ from 'lodash'
import TweetsWrapper from './TweetsWrapper'
import Loading from '../common/Loading'
import Footer from '../Footer'
import { TypeList } from '../../helpers/formatter'

class TimelineWrapper extends Component {

  constructor(props) {
    super();
    this.onCategoryChanged = this.onCategoryChanged.bind(this);
  }

  componentWillMount() {
    this.props.onMountFunc()
  }

  onCategoryChanged(category) {
    this.props.changeCategory(category);
  }

  render () {
    const { isFetching, data, isHidden } = this.props;
    return (<div>
      { isFetching && <Loading /> }
      { !isFetching && data && <div>
        <div className="container-fluid page-top">
          <div className="desc">Explore {data.count.toLocaleString()} tweets by categories in a time range</div>
          <div className={isHidden ? 'fixed' : ''}>
            <div className="row tweets-top">
              <ul className="list-inline">
                { ['interaction', 'media', 'language', 'source', 'none'].map((category) => (
                  <li
                    key={category}
                    onClick={() => this.onCategoryChanged(category)}
                    className={`link ${this.props.category === category ? 'selected' : 'normal'}`}
                  >
                    {category === 'none' ? 'All Tweets' : category}
                  </li>)
                )}
              </ul>
            </div>
            <div className="row tweets-legend">
            { this.props.category !== 'none' && <div className="legend-wrapper">
              { TypeList[this.props.category].map((t, i) => (
                <span key={i} className="legend-type">
                <span className="type-wrapper">
                  <span className={`type type-${t.split(' ')[0]}`} />
                  <span>{t}</span>
                </span>
              </span>)) }
              </div>}
            </div>
          </div>
        </div>

        <div className="container">
          <TweetsWrapper {...this.props} />
        </div>
      </div>}

      <div className="container-fluid">
        <Footer/>
      </div>
    </div>)
  }
}

export default TimelineWrapper