import React from 'react';
import { withScriptjs, withGoogleMap } from "react-google-maps";
import { GoogleMap } from "react-google-maps";

import ListingMarkers from '../ListingMarkers';

class Map extends React.Component {
  onMapMounted = ref => {
    this.map = ref;
  }
  onCenterChanged = () => {
    let center = this.map.getCenter();
    let coords = {lng: center.lng(), lat: center.lat()}
    this.props.onDragEnd(coords)
  }
  render(){
    return(
      <GoogleMap
        zoom={12}
        defaultCenter={this.props.center}
        defaultOptions={{disableDefaultUI: true, gestureHandling: 'greedy'}}
        onDragEnd={this.onCenterChanged}
        ref={this.onMapMounted}
      >
        <ListingMarkers />
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(Map))
