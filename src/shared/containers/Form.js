import { connect } from 'react-redux';

import { formActions } from '../reducers/form';
import ListingForm from '../components/ListingForm';
import Modal from '../components/Modal';

export default Modal(connect(
  ({form}) => form,
  { ...formActions }
)(ListingForm))
