import React from 'react';

import styles from './desktop.css';

class Filter extends React.Component {
  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.props.setFilter({
      [name]: value
    });
  }
  render(){
    return(
      <div className={styles.container}>
        <span>Bedrooms</span>
        <input className={styles.small} onChange={this.handleInputChange} name="br" value={this.props.br} placeholder="0+" />
        <span>Bathrooms</span>
        <input className={styles.small} onChange={this.handleInputChange} name="ba" value={this.props.ba} placeholder="0+" />
        <span>Max. Rent</span>
        <input onChange={this.handleInputChange} name="rent" value={this.props.rent} />
      </div>
    )
  }
}

export default Filter;
