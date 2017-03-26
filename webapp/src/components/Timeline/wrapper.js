import React, { Component } from 'react'
import _ from 'lodash'
import TweetsWrapper from './TweetsWrapper'

class TimelineWrapper extends Component {

  constructor(props) {
    super();
    this.onViewChanged = this.onViewChanged.bind(this);
    this.onCategoryChanged = this.onCategoryChanged.bind(this);
  }

  componentWillMount() {
    this.props.onMountFunc()
  }

  onViewChanged(e) {
    this.props.changeView(e.currentTarget.value);
  }

  onCategoryChanged(e) {
    this.props.changeCategory(e.currentTarget.value);
  }

  render () {
    const { isFetching, data } = this.props;
    return (<div>
      { isFetching && <h1> Loading... </h1> }
      { !isFetching && data && <div className="row">
        <div>
          { ['all', 'category'].map((view) => <span key={view}>
              <input
                type="radio"
                name="view"
                value={view}
                checked={this.props.view === view}
                onChange={this.onViewChanged}
              /> { view === 'all' ? 'All Tweets' : 'Tweets by Category'}
          </span>) }
          { this.props.view === 'category' && <div>
            { ['interaction', 'media', 'language', 'source'].map((category) => <span key={category}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={this.props.category === category}
                  onChange={this.onCategoryChanged}
                /> {category}
            </span>)}
          </div> }
        </div>
        <div className="col-xs-12">
          <TweetsWrapper {...this.props} />
        </div>
      </div>}
    </div>)
  }
}

export default TimelineWrapper