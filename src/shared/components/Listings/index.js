import React from 'react';

import ListingsWrapper from '../../containers/Listings';
import ListingCard from '../ListingCard';

import styles from './index.css';

const Listings = ({listings}) => {
  if(listings.length){
    return(
      <React.Fragment>
        {listings.map(listing =>
          <ListingCard key={listing._id} listing={listing} />
        )}
      </React.Fragment>
    )
  }
  return(
    <div className={styles.container}>
      <div>
      <h1>Couldn't Find Any Listings</h1>
      <p>Move the map or search in another location to find some.</p>
      </div>
    </div>
  )
}

export default ListingsWrapper(Listings)
