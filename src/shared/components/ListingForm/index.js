import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../Input';
import ImageUploader from '../ImageUploader';
import LoadSpinner from '../LoadSpinner';
import styles from './index.css';

class ListingForm extends React.PureComponent {
  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.props.handleInputChange({
      [name]: value
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validateFields();
    if(!errors){
      let { address, city, state, zip, bedrooms, bathrooms, rent, deposit, headline, description, file } = this.props;
      let body = {
        address: address,
        city: city,
        state: state,
        zip: zip,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        rent: rent,
        deposit: deposit,
        headline: headline,
        description: description,
      };


      const data = new FormData();
      data.append('body', JSON.stringify(body));
      if(file){
        data.append('image', file);
      }
      this.props.handleSubmit(data)
    } else {
      console.log("ERRORS", errors);
      this.props.displayErrors(errors)
    }
  }
  uploadImage = image => {
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      this.props.handleInputChange({file: image, image: reader.result})
    }, false);
    reader.readAsDataURL(image);
  }
  validateFields = () => {
    let { address, city, state, zip, bedrooms, bathrooms, rent, headline, description } = this.props;
    let errors = {};
    if(!headline) errors.headline = true;
    if(!description) errors.description = true;
    if(!bedrooms || isNaN(bedrooms) || bedrooms < 0) errors.bedrooms = true;
    if(!bathrooms || isNaN(bedrooms) || bedrooms < 0) errors.bathrooms = true;
    if(!rent || isNaN(rent) || rent <= 0) errors.rent = true;
    if(!address) errors.address = true;
    if(!city) errors.city = true;
    if(!state) errors.state = true;
    if(!zip) errors.zip = true;

    return Object.entries(errors).length === 0 ? false : errors
  }
  render(){
    if(this.props.isProcessing){
      return <LoadSpinner />
    }

    let { address, city, state, zip, bedrooms, bathrooms, rent, deposit, headline, description, image, errors } = this.props;
    return(
      <div className={styles.container}>
        <div className={styles.subheader}>
          <h2>New Listing</h2>
          <Link to={this.props.prevLoc} className={styles.closeBtn}>
              Cancel
          </Link>
        </div>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.panel}>
            <ImageUploader image={image} uploadImage={this.uploadImage}
              placeholder={
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="#d3d3d3" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              }
            />
            {errors.file && <div className={styles.errors}>Unable to upload file</div>}
            <Input name="headline" label="headline" hasError={errors.headline} value={headline} onChange={this.handleInputChange} />
            <div className={styles.description}>
              <label for="description">DESCRIPTION</label>
              <textarea style={errors.description ? {borderColor: '#e75b52'} : {}} rows="4" name='description' type='text' value={description} onChange={this.handleInputChange} />
              {errors.description && <div className={styles.errors}>This field is required</div>}
            </div>
          </div>
          <div className={styles.panel}>
            <Input name="address" label="street address" hasError={errors.address} value={address} onChange={this.handleInputChange} />
            <div className={styles.three}>
              <Input name="city" label="city" hasError={errors.city} value={city} onChange={this.handleInputChange} />
              <Input name="state" label="state" hasError={errors.state} value={state} onChange={this.handleInputChange} />
              <Input name="zip" label="zip" hasError={errors.zip} value={zip} onChange={this.handleInputChange} />
            </div>
            <Input name="bedrooms" label="bedrooms" hasError={errors.bedrooms} value={bedrooms} onChange={this.handleInputChange} />
            <Input name="bathrooms" label="bathrooms" hasError={errors.bathrooms} value={bathrooms} onChange={this.handleInputChange} />
            <Input name="rent" label="rent" hasError={errors.rent} value={rent} onChange={this.handleInputChange} />
            <Input name="deposit" label="deposit" hasError={errors.deposit} value={deposit} onChange={this.handleInputChange} />
            <div className={styles.btn} onClick={this.handleSubmit}>Create Listing</div>
          </div>
        </form>
      </div>
    );
  }
}

export default ListingForm;
