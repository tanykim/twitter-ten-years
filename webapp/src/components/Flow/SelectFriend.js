import React, { Component } from 'react'
import Select from 'react-select'

class SelectFriend extends Component {

  constructor(props) {
    super();
    this.state = {value: ''};
    this.changeOption = this.changeOption.bind(this);
  }

  changeOption(e) {
    this.setState({value: e.value});
    this.props.selectFriend(e.value);
  }

  //when friend is changed via other options
  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.friend.id});
  }

  render() {
    return (
      <Select
        name="form-field-name"
        options={this.props.friends}
        value={this.state.value}
        onChange={this.changeOption}
        clearable={true}
      />
    )
  }
}

export default SelectFriend