import { connect } from 'react-redux'
import Menu from '../components/Menu'

const mapStateToProps = (state, ownProps) => (
  { isHidden: state.isHidden }
)

export default connect(mapStateToProps)(Menu)