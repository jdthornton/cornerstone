export const CLEAR_FORM = 'CLEAR_FORM';
export const UPDATE_FORM_INPUT = 'UPDATE_FORM_INPUT';
export const CREATE_LISTING_REQUEST = 'CREATE_LISTING_REQUEST';

export const formActions = {
  handleSubmit: payload => ({type: CREATE_LISTING_REQUEST, payload}),
  handleInputChange: payload => ({type: UPDATE_FORM_INPUT, payload})
}

const initialState = {
  address: '',
  city: '',
  state: '',
  zip: '',
  bedrooms: '',
  bathrooms: '',
  rent: '',
  deposit: '',
  headline: '',
  description: '',
  image: null,
  file: null,
  errors: '',
  isProcessing: false
};

const reducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_FORM_INPUT:
          return {
            ...previousState,
            ...payload
          }
        case CREATE_LISTING_REQUEST:
          return {
            ...previousState,
            isProcessing: true
          }
        case CLEAR_FORM:
          return initialState
        default:
            return previousState;
    }
};

export default reducer;
