export const LISTING_REQUEST = 'LISTING_REQUEST';
export const LISTING_REQUEST__SUCCEEDED = 'LISTING_REQUEST__SUCCEEDED';
export const LISTING_REQUEST__FAILED = 'LISTING_REQUEST__FAILED';

export const getListing = payload => ({type: LISTING_REQUEST, payload});

const initialState = { listing: null, error: null };

const reducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case LISTING_REQUEST__SUCCEEDED:
          return {
            listing: payload
          }
        case LISTING_REQUEST__FAILED:
          return {
            error: payload
          }
        default:
            return previousState;
    }
};

export default reducer;
