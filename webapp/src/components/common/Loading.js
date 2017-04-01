import React, { Component } from 'react'

class Loading extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 loader">
            Loading...
          </div>
        </div>
      </div>
    );
  }
}

export default Loading
