import inputReducer from './input';
import mapReducer from './map';
import listingReducer from './listing';
import formReducer from './form';
import filterReducer from './filter';

export default {
  listing: listingReducer,
  map: mapReducer,
  input: inputReducer,
  form: formReducer,
  filter: filterReducer
}
