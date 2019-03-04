import { connect } from 'react-redux';

import { handleSubmit, handleInputChange, displayErrors } from '../reducers/form';
import ListingForm from '../components/ListingForm';
import Modal from '../components/Modal';

export default Modal(connect(
  ({form}) => form,
  { handleSubmit, handleInputChange, displayErrors }
)(ListingForm))
