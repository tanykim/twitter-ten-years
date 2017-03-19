import { connect } from 'react-redux'
import { fetchDataIfNeeded } from '../actions'
import Page from '../components/Page'

const mapStateToProps = (state, ownProps) => (
  {
    isFetching: state.isFetching,
    range: state.timeRange,
    page: ownProps.params.page,
    dataByPage: state.dataByPage
  }
)

const mapDispatchToProps = (dispatch) => (
  { onMountFunc: (page) => dispatch(fetchDataIfNeeded(page)) }
)

export default connect(mapStateToProps, mapDispatchToProps)(Page)