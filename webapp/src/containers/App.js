import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchDataIfNeeded, invalidatePage } from '../actions'
import Menu from '../components/Menu'
import _ from 'lodash';

class App extends Component {

  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const selectedPage = this.props.params.page
    if (selectedPage) {
      this.props.dispatch(fetchDataIfNeeded(selectedPage))
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.page && this.props.params !== nextProps.params ) {
      const nextPage = nextProps.params.page;
      console.log(this.props.data[nextPage], this.props.isFetching);
      this.props.dispatch(fetchDataIfNeeded(nextPage))
    }
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const selectedPage = this.props.params.page
    this.props.dispatch(invalidatePage(selectedPage))
    this.props.dispatch(fetchDataIfNeeded(selectedPage))
  }

  render() {
    const { data, isFetching } = this.props
    const page = this.props.params.page
    console.log('----- App Render', page, isFetching, _.has(data[page], 'data'));
    const isDataReceived = _.has(data[page], 'data');
    return (
      <div>
        <Menu />
        {!isFetching && <a href='#' onClick={this.handleRefreshClick}> Refresh </a>}
        {isFetching && <h1> Loading </h1>}
        { //page is undefined when it's home
          (isDataReceived || page === undefined) && this.props.children
        }
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    data: state.dataByPage,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps)(App)