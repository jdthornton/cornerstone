import { connect } from 'react-redux';

import { getListing } from '../reducers/listing';
import Listing from '../components/Listing';
import Modal from '../components/Modal';

export default Modal(connect(
  ({listing}) => listing,
  {getListing}
)(Listing));
