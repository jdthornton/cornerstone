import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.css';

const ListingCard = ({listing}) => (
  <Link to={`/listings/${listing._id}`} className={styles.container}>
    {listing.image
      ? <div className={styles.image} style={{backgroundImage: `url(${listing.image})`}}></div>

      : <div className={styles.placeholder}>
          <svg width="78" height="78" viewBox="0 0 24 24"><path fill="#d3d3d3" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </div>
    }
    <div className={styles.details}>${listing.rent} • {listing.bedrooms} BED • {listing.bathrooms} BATH</div>
    <div className={styles.headline}>{listing.headline}</div>
    <div className={styles.address}>{listing.address}, {listing.city}, {listing.state}</div>
  </Link>
);

export default ListingCard;
