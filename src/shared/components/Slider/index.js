import React from 'react';

import styles from './index.css';

class Slider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: props.isMobile ? false : true
    }
  }
  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
  _renderIcon = () => {
    if(this.props.isMobile){
      if(this.state.isOpen) return <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      else return "View Listings"
    } else {
      if(this.state.isOpen) return <svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5v10z"/><path fill="none" d="M0 24V0h24v24H0z"/></svg>
      else return <svg viewBox="0 0 24 24"><path d="M14 7l-5 5 5 5V7z"/><path fill="none" d="M24 0v24H0V0h24z"/></svg>
    }
  }
  render(){
    let { isOpen } = this.state;
    return(
      <div className={isOpen ? styles.container+" "+styles.open : styles.container}>
        <div onClick={this.toggleOpen} className={styles.btn}>{this._renderIcon()}</div>
        <div className={styles.list}>{isOpen && this.props.children}</div>
      </div>
    )
  }
}

export default Slider;
