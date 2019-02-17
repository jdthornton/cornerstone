import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Image from '../Image';
import Card from '../Card';
import LoadSpinner from '../LoadSpinner';

import styles from './index.css';

class Listing extends React.PureComponent {
  componentDidMount(){
    this.props.getListing(this.props.match.params.id)
  }
  render(){
    if(this.props.listing){
      let { image, address, city, state, zip, location, headline, description, bedrooms, bathrooms, rent, deposit } = this.props.listing;
      return(
        <div className={styles.container}>
              <Helmet><title>{this.props.address}</title></Helmet>
              <Link to={this.props.prevLoc} className={styles.close}>X</Link>
              <div className={styles.image}>
                <Image
                  image={image}
                  placeholder={
                    <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 24 24"><path fill="#d3d3d3" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                  }
                  height="100%"
                  width="100%"
                />
              </div>
              <div className={styles.info}>
                <h4>{address}<br />{city}, {state}, {zip}</h4>
                <ul className={styles.details}>
                  <li><h4>{bedrooms} Bed</h4></li>
                  <li><h4>{bathrooms} Bath</h4></li>
                  <li><h4>${rent}/mo.</h4></li>
                </ul>
              </div>
            <div className={styles.space}>
              <div className={styles.application}>
                <Card>
                  <div className={styles.padding}>
                  <h5>Application status</h5>
                  <div className={styles.applicationBtn}>Apply Now</div>
                  </div>
                </Card>
              </div>
              <div className={styles.infoContainer}>
                <Card>
                  <div className={styles.padding}>
                    <h4>{headline}</h4>
                    <p>{description}</p>
                    {deposit &&
                      <div className={styles.margin}>
                        <h5>Move-In Details</h5>
                        {deposit && <p>Security Deposit: <b>${deposit}.00</b></p>}
                      </div>
                    }
                  </div>
                </Card>
              </div>
            </div>
        </div>
      )
    }

    if(this.props.error){
      return <div>Error: {this.props.error}</div>
    }

    return(
      <LoadSpinner />
    )
  }
}

export default Listing;
