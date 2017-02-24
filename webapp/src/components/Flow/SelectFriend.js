import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { selectFriend } from '../../actions'

class SelectFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVal: ''
    };
  }

  render() {
    return (
      <Select
        name="form-field-name"
        value={this.state.selectedVal}
        options={this.props.friends}
        onChange={(e) => {
          console.log(e);
          this.setState({selectedVal: e.value});
          console.log(this.state.selectedVal, e.label);
          return this.props.dispatch(selectFriend(e.value))
        }}
        clearable={false}
      />
    )
  }
}

SelectFriend = connect()(SelectFriend)

export default SelectFriend