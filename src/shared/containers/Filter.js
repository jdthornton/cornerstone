import { connect } from 'react-redux';
import loadable from '@loadable/component'

import { setFilter } from '../reducers/filter';
const Filter = loadable(props => import(`../components/Filter/${props.isMobile ? 'mobile' : 'desktop'}`))

export default connect(
  ({filter}) => filter,
  { setFilter }
)(Filter)
