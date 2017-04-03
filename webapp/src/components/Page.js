import React, { Component } from 'react'
import Menu from '../components/Menu'
import TimelineStates from '../containers/Timeline'
import FlowStates from '../containers/Flow'

class Page extends Component {

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  // componentWillMount() {
  // }
  //scroll
  componentDidMount() {
    this.setState({ isHidden: false });
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
    const isHidden = this.state ? this.state.isHidden : false;
    return (
      <div>
        <Menu isHidden={isHidden} />
        <div className="content" id="content">
          { page === 'tweets' && <TimelineStates isHidden={isHidden}/> }
          { page === 'friends' && <FlowStates isHidden={isHidden} /> }
        </div>
      </div>
    );
  }
}

export default Page;

