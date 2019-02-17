export const UPDATE_CENTER = 'UPDATE_CENTER';
export const MAP_MOVE = 'MAP_MOVE'
export const SEARCH_LISTINGS_REQUEST = 'SEARCH_LISTINGS_REQUEST';
export const SEARCH_LISTINGS_REQUEST__SUCCEEDED = 'SEARCH_LISTINGS_REQUEST__SUCCEEDED';
export const SEARCH_LISTINGS_REQUEST__FAILED = 'SEARCH_LISTINGS_REQUEST__FAILED';

export const searchListings = payload => ({type: SEARCH_LISTINGS_REQUEST, payload})

export const findNearbyListings = payload => ({type: MAP_MOVE, payload});

const initialState = { listings: [], coords: {lng: 45.510601, lat: -122.6559309}, error: null, isLoading: false };

const reducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case SEARCH_LISTINGS_REQUEST:
          return {
            ...previousState,
            isLoading: true
          }
        case UPDATE_CENTER:
          return {
            ...previousState,
            coords: payload
          }
        case SEARCH_LISTINGS_REQUEST__SUCCEEDED:
          return {
            ...previousState,
            ...payload,
            isLoading: false
          }
        case SEARCH_LISTINGS_REQUEST__FAILED:
          return {
            ...previousState,
            error: payload,
            isLoading: false
          }
        default:
            return previousState;
    }
};

export default reducer;
