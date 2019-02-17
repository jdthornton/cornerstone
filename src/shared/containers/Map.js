import React from 'react';
import { connect } from 'react-redux';

import { findNearbyListings } from '../reducers/map'
import MapLayout from '../components/MapContainerLayout';

export default connect(
  ({map}) => ({coords: map.coords, error: map.error, isLoading: map.isLoading}),
  {findNearbyListings}
)(MapLayout)
