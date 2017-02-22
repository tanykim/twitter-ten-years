import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './Menu';
import Footer from './Footer';
import FlowStates from '../containers/FlowStates';

class Page extends Component {
  render() {
    const menu = this.props.params.page;
    return (
      <div>
        <div className="row header">
          <div className="col-xs-12">
            <Link to="/"> Home </Link>
            <Menu page={menu}/>
          </div>
        </div>
        { menu === 'flow' && <FlowStates />}
        <Footer />
      </div>
    );
  }
}

export default Page;

