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
    const noErrors = Object.keys(errors).every(i => !errors[i])
    if(noErrors){
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
      console.log("Errors: ", errors);
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
    const errors = {};
    errors.headline = !headline ? true : false;
    errors.description = !description ? true : false;
    errors.bedrooms = !bedrooms || isNaN(bedrooms) || bedrooms <= 0 ? true : false;
    errors.bathrooms = !bathrooms || isNaN(bathrooms) || bathrooms <= 0 ? true : false;
    errors.rent = !rent || isNaN(rent) || rent < 0 ? true : false;
    errors.address = !address ? true : false;
    errors.city = !city ? true : false;
    errors.state = !state ? true : false;
    errors.zip = !zip ? true : false;
    return errors;
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
            <Input name="headline" label="headline" value={headline} onChange={this.handleInputChange} />
            <div className={styles.description}>
              <label for="description">DESCRIPTION</label>
              <textarea style={errors.description ? {borderColor: '#e75b52'} : {}} rows="4" name='description' type='text' value={description} onChange={this.handleInputChange} />
              {/*errors.description && <div className={styles.errors}>This field is required</div>*/}
            </div>
          </div>
          <div className={styles.panel}>
            <Input name="address" label="street address" value={address} onChange={this.handleInputChange} />
            <div className={styles.three}>
              <Input name="city" label="city" value={city} onChange={this.handleInputChange} />
              <Input name="state" label="state" value={state} onChange={this.handleInputChange} />
              <Input name="zip" label="zip" value={zip} onChange={this.handleInputChange} />
            </div>
            <Input name="bedrooms" label="bedrooms" value={bedrooms} onChange={this.handleInputChange} />
            <Input name="bathrooms" label="bathrooms" value={bathrooms} onChange={this.handleInputChange} />
            <Input name="rent" label="rent" value={rent} onChange={this.handleInputChange} />
            <Input name="deposit" label="deposit" value={deposit} onChange={this.handleInputChange} />
            <button style={{display: 'none'}} type="submit" />
            {/*errors.form && <div className={styles.error}>{errors.form}</div>*/}
            <div className={styles.btn} onClick={this.handleSubmit}>Create Listing</div>
          </div>
        </form>
      </div>
    );
  }
}

export default ListingForm;
