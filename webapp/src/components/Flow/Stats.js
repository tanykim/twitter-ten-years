import React, { Component } from 'react'

class Stats extends Component {
  render () {
    return (
      <div className="flow-stats">
        <div> Selected: {this.props.selectedFriend} </div>
        <div>Sent mentions to <b>{this.props.lines.length}</b> twitter accounts</div>
        <div id="flow-stats" className="hover-summary"></div>
      </div>
    );
  }
}

export default Stats