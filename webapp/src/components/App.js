import React, { Component } from 'react'
import { setPage, setTimeRange } from '../actions'

class App extends Component {
  setDataforPage(page) {
    this.context.store.dispatch(setPage(page));
    this.context.store.dispatch(setTimeRange());
  }
  componentWillMount() {
    this.setDataforPage(this.props.params.page);
  }
  componentWillReceiveProps(nextProps){
    this.setDataforPage(nextProps.location.pathname);
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
  store: React.PropTypes.object
}

export default App;