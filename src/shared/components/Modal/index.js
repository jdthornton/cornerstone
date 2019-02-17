import React from 'react';

import styles from './index.css';

export default function Modal(WrappedComponent){
  return class ModalHOC extends React.Component {
    render(){
      return(
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }
}
