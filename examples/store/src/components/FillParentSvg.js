import React, {Component} from 'react';
import {connect} from 'react-redux';

import mapActionCreators from '../util/map-action-creators'
import {actionCreators} from '../ducks/fill-parent-svg';

const mapStateToProps = state => Object();
const mapDispatchToProps = mapActionCreators(actionCreators);
const connectWithProps = connect(mapStateToProps, mapDispatchToProps);

const style = {
  width: '100%',
  height: '100%'
};

class FillParentSvg extends Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize();
  }
  
  render() {
    const {children} = this.props;
    const saveRef = r => this.node = r;
    
    return (
      <svg
        ref={saveRef}
        style={style}>
        {children}
      </svg>
    );
  }
  
  handleResize() {
    const {clientWidth, clientHeight} = this.node;
    const {setSvgSize} = this.props;
    
    setSvgSize({
      width: clientWidth,
      height: clientHeight
    });
  }
}

export default connectWithProps(FillParentSvg);
