import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

export default function(Component){
  class ListingsDataHOC extends React.PureComponent {
    getVisibleListings = () => {
      let { br, ba, rent } = this.props
      return this.props.listings.filter(
        listing => (br == '' || listing.bedrooms >= br) && (ba == '' || listing.bathrooms >= ba) && (rent == '' || listing.rent <= rent)
      )
    }
    render(){
      return(
        <Component listings={this.getVisibleListings()} push={this.props.push} />
      )
    }
  }

  return connect(
    ({map, filter}) => ({
      listings: map.listings,
      br: filter.br,
      ba: filter.ba,
      rent: filter.rent
    }),
    { push }
  )(ListingsDataHOC)
}
