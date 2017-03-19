import React, { Component } from 'react'
import Select from 'react-select'

class SelectFriend extends Component {
 render() {
    return (
      <Select
        name="form-field-name"
        options={this.props.friends}
        onChange={(e) => {
          this.props.selectFriend(e.value)
        }}
        clearable={false}
      />
    )
  }
}

export default SelectFriend