import { connect } from 'react-redux'
import { showScrolledPage } from '../actions'
import Page from '../components/Page'

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.route.path;
  return {
    page: path.slice(1, path.length)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handScroll: (e) => {
      const scrollTop = e.srcElement.body.scrollTop;
      if (scrollTop > 100) {
        dispatch(showScrolledPage(true));
      } else {
        dispatch(showScrolledPage(false));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)