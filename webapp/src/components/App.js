import React, { Component } from 'react';
import Menu from './Menu';
import Flow from './Flow';
import Footer from './Footer';
import { Link } from 'react-router';

console.log('--------app.js');

class App extends Component {
  render() {
    const page = this.props.params.page;
    return (
      <div>
        <div className="row header">
          <div className="col-xs-12">
            <Link to="/"> Home </Link>
            <Menu page={page}/>
          </div>
        </div>
        { page === 'flow' && <Flow />}
        <Footer />
      </div>
    );
  }
}

export default App;
