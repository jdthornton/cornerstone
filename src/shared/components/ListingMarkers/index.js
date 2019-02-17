import React from 'react';
import { Marker} from "react-google-maps";

import ListingContainer from '../../containers/Listings'

const ListingMarkers = ({listings, push}) =>
  listings.length
    ? listings.map(listing =>
      <Marker
        position={{lat: listing.location.coordinates[1], lng: listing.location.coordinates[0]}}
        key={listing._id}
        onClick={() => {push('/listings/'+listing._id)}}
      />
    )

    : null

export default ListingContainer(ListingMarkers);
