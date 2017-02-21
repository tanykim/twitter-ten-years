import { connect } from 'react-redux'
import { setMenu } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => (
  // console.log(state, ownProps);
  // return {
    {active: ownProps.menu === state.menuSetter}
  // };
)

const mapDispatchToProps = (dispatch, ownProps) => (
  // console.log(ownProps);
  {
  onClick: () => {
    dispatch(setMenu(ownProps.menu))
  }
})

const MenuLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default MenuLink