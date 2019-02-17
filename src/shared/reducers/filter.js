export const SET_FILTER = 'SET_FILTER';

export const setFilter = payload => ({type: SET_FILTER, payload});

const initialState = { br: '', ba: '', rent: '' };

const reducer = (previousState = initialState, { type, payload }) => {
    switch (type) {
        case SET_FILTER:
          return {
            ...previousState,
            ...payload
          }
        default:
            return previousState;
    }
};

export default reducer;
