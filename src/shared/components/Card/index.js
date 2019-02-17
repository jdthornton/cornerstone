import React from 'react';

import styles from './index.css';

const Card = ({children}) => (
  <div className={styles.container}>
    {children}
  </div>
);

export default Card;
