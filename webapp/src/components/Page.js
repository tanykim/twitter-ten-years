import React, { Component } from 'react';
import Menu from './Menu';
import Flow from './Flow';
import Footer from './Footer';
import { Link } from 'react-router';

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
        { menu === 'flow' && <Flow />}
        <Footer />
      </div>
    );
  }
}

export default Page;

