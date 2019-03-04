export const CLEAR_FORM = 'CLEAR_FORM';
export const UPDATE_FORM_INPUT = 'UPDATE_FORM_INPUT';
export const CREATE_LISTING_REQUEST = 'CREATE_LISTING_REQUEST';
export const DISPLAY_ERRORS = "DISPLAY_ERRORS";

export const handleSubmit = payload => ({type: CREATE_LISTING_REQUEST, payload})
export const handleInputChange = payload => ({type: UPDATE_FORM_INPUT, payload})
export const displayErrors = payload => ({type: DISPLAY_ERRORS, payload})
export const clearForm = () => ({type: CLEAR_FORM})

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
  errors: {},
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
        case DISPLAY_ERRORS:
          return {
            ...previousState,
            errors: payload
          }
        case CLEAR_FORM:
          return initialState
        default:
            return previousState;
    }
};

export default reducer;
