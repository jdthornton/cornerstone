import React from 'react';

import styles from './index.css';

class Offline extends React.Component {
  state = {
    offline: false
  }
  handleOffline = ({type}) => { this.setState({ offline: type !== 'online' }); }
  componentDidMount(){
    window.addEventListener('offline', this.handleOffline);
    window.addEventListener('online', this.handleOffline);
  }
  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOffline);
    window.removeEventListener('online', this.handleOffline);
  }
  render(){
    if(this.state.offline){
      return  <div className={styles.offline}>It looks like you're offline. Some parts of Cornerstone may not work right now.</div>
    }

    return null;
  }
}

export default Offline;
