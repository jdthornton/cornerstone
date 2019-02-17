import React from 'react';

import Map from '../Map';
import Slider from '../Slider';
import Listings from '../Listings'
import LoadSpinner from '../LoadSpinner';

import styles from './index.css';

class MapLayout extends React.Component {
  shouldComponentUpdate(nextProps){
    return (this.props.isLoading || nextProps.isLoading || nextProps.error)
  }
  render(){
    if(this.props.isLoading){
      return <LoadSpinner />;
    }

    if(this.props.error){
      return(
        <div>There was an error please try again.</div>
      )
    }

    if(this.props.coords){
      return(
        <React.Fragment>
          <Map
            center={this.props.coords}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3&libraries=geometry,drawing,places`}
            loadingElement={<div className={styles.map} />}
            containerElement={<div className={styles.map} />}
            mapElement={<div style={{ height: `100%` }} />}
            onDragEnd={this.props.findNearbyListings}
          />
          <Slider isMobile={this.props.isMobile}>
            <Listings />
          </Slider>
        </React.Fragment>
      )
    }

    return null
  }
}

export default MapLayout
