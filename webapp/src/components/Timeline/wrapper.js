import React, { Component } from 'react'
import _ from 'lodash'
import TweetsWrapper from './TweetsWrapper'
import Loading from '../common/Loading'

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
    const { isFetching, data } = this.props;
    return (<div>
      { isFetching && <Loading /> }
      { !isFetching && data && <div>
        <div className="container-fluid header">
          <div className="desc">Explore tweets by categories in a certain range of time</div>
          <ul className={`list-inline${this.props.isHidden ? ' fixed' : ''}`}>
            { ['interaction', 'media', 'language', 'source', 'none'].map((category) => (
              <li
                key={category}
                onClick={() => this.onCategoryChanged(category)}
                className={`link ${this.props.category === category ? 'selected' : 'normal'}`}
              >
                {category === 'none' ? 'No Category' : category}
              </li>)
            )}
          </ul>
        </div>
        <div className="container">
          <TweetsWrapper {...this.props} />
        </div>
      </div>}
    </div>)
  }
}

export default TimelineWrapper