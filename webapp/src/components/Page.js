import React, { Component } from 'react'
import Menu from '../components/Menu'
import Footer from './Footer'
import TimelineStates from '../containers/Timeline'
import FlowStates from '../containers/Flow'

class Page extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.setState({ isHidden: false });
  }
  //scroll
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const scrollTop = event.srcElement.body.scrollTop;
    if (scrollTop > 100) {
      if (!this.state.isHidden) {
        this.setState({isHidden: true});
      }
    } else {
      if (this.state.isHidden) {
        this.setState({isHidden: false});
      }
    }
  }

  render() {
    const page = this.props.params.page
    return (
      <div>
        <Menu isHidden={this.state.isHidden} />
        <div className="content" id="content">
          { page === 'tweets' && <TimelineStates isHidden={this.state.isHidden}/> }
          { page === 'friends' && <FlowStates /> }
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Page;

